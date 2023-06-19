import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetBlockssByValidator } from "../../../hooks/useGetBlocksByValidator";
import {
  MOTE_VALUE,
  formatNumber,
  getRelativeDateTime,
  truncateString,
} from "../../../utils/Utils";
import Table from "../Table/Table";
import { gql, useQuery } from "@apollo/client";
import { useGetStatusInfos } from "../../../hooks/useGetStatusInfos";
import dynamic from "next/dynamic";
import Card from "../Card/Card";
import classNames from "classnames";
import { FiSearch } from "react-icons/fi";
import ChartValidatorSkeleton from "./ChartValidatorSkeleton";
import { useTheme } from "next-themes";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface StakingData {
  count_op: number;
  amount_approx: number;
  date: string;
  staking_operation: "delegate" | "undelegate";
}

interface DelegateData {
  staking_operation_daily_per_validator: StakingData[];
}

const TOTAL_ACTION = gql`
  query MyQueryAction($key: String, $dateEnd: date, $limit: Int) {
    staking_operation_daily_per_validator(
      where: { validator_public_key: { _eq: $key }, date: { _lte: $dateEnd } }
      order_by: { date: desc }
      limit: $limit
    ) {
      count_op
      amount_approx
      date
      staking_operation
    }
  }
`;

const DelegateUndelegateByDay = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { id } = router.query;

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const { data, loading, error } = useQuery<DelegateData>(TOTAL_ACTION, {
    variables: {
      key: id,
      dateEnd: date,
      limit: 28,
    },
  });

  const actions = [
    ...(data?.staking_operation_daily_per_validator || []),
  ].reverse();

  const actionsDay = [...actions].filter(
    (v, i, a) => a.findIndex(v2 => v2.date === v.date) === i
  );

  const delegate = actions.filter(act => act.staking_operation === "delegate");
  const undelegate = actions.filter(
    act => act.staking_operation === "undelegate"
  );
  const delegateFinal: StakingData[] = [];
  const undedelegateFinal: StakingData[] = [];

  for (let index = 0; index < actionsDay.length; index++) {
    const dateToSearch = actionsDay[index].date;

    const staked = delegate.find(del => del.date === dateToSearch) || {
      date: dateToSearch,
      staking_operation: "delegate",
      amount_approx: 0,
      count_op: 0,
    };

    const unstaked = undelegate.find(del => del.date === dateToSearch) || {
      date: dateToSearch,
      staking_operation: "undelegate",
      amount_approx: 0,
      count_op: 0,
    };
    delegateFinal.push(staked);
    undedelegateFinal.push(unstaked);
  }
  console.log("charlie", delegateFinal);
  const config: ApexCharts.ApexOptions = {
    series: [
      {
        name: "Delegation",
        type: "column",
        data: delegateFinal.map(rew => Math.round(rew.count_op)),
      },
      {
        name: "CSPR delegated",
        type: "line",
        data: delegateFinal.map(rew => Math.round(rew.amount_approx)),
      },
      {
        name: "CSPR undelegated",
        type: "line",
        data: undedelegateFinal.map(rew => Math.round(rew.amount_approx)),
      },

      {
        name: "Undelegation",
        type: "column",
        data: undedelegateFinal.map(rew => Math.round(rew.count_op)),
      },
    ],
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: [3, 3, 3, 3],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: "50%",
        rangeBarGroupRows: true,
      },
    },
    responsive: [
      {
        breakpoint: 767,
        options: {
          stroke: {
            width: [3, 3, 3, 3],
            curve: "smooth",
          },
          legend: {
            fontSize: "14px",
            offsetY: 20,
            itemMargin: {
              vertical: 10,
              horizontal: 10,
            },
          },
        },
      },
    ],
    fill: {
      opacity: [1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
      },
    },
    labels: actions
      .filter((v, i, a) => a.findIndex(v2 => v2.date === v.date) === i)
      .map(st => st.date),
    markers: {
      size: 0,
    },
    legend: {
      fontSize: "12px",
      offsetY: 20,
      itemMargin: {
        vertical: 20,
        horizontal: 20,
      },
    },
    grid: {
      borderColor: theme === "dark" ? "#111827" : "#f3f4f6",
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: theme === "dark" ? "#f3f4f6" : "#111827",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === "dark" ? "#f3f4f6" : "#111827",
        },
      },
      title: {
        style: {
          color: theme === "dark" ? "#f3f4f6" : "#111827",
        },
        text: "Total CSPR staked/unstaked",
      },
    },

    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return Intl.NumberFormat("us-US").format(y);
          } else {
            return "0";
          }
        },
      },
    },
  };

  return (
    <div className="w-full overflow-y-hidden flex-nowrap">
      <Card title="Delegate / undelegate CSPR by days">
        {loading ? (
          <ChartValidatorSkeleton />
        ) : (
          <Chart
            options={config}
            series={config.series}
            type="line"
            height={400}
          />
        )}
        <div className="flex items-center mt-2 text-secondary">
          <div className="flex items-center space-x-2">
            <p className="text-secondary">Date :</p>

            <input
              type="date"
              className="px-4 py-2 text-base placeholder-gray-400 border rounded-lg w-60 text-secondary dark:border-gray-900 background-card focus:outline-none focus:ring-2 focus:ring-indigo-600"
              id="start"
              name="trip-start"
              onChange={e => setDate(e.target.value)}
              value={date}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DelegateUndelegateByDay;
