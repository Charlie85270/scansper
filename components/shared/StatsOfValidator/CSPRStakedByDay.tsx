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

const TOTAL_CSPR_STAKED = gql`
  query MyQueryStaked($key: String, $dateEnd: date, $limit: Int) {
    staked_amount_daily_candle_per_validator(
      where: { validator_public_key: { _eq: $key }, date: { _lte: $dateEnd } }
      order_by: { date: desc }
      limit: $limit
    ) {
      open_staked_amount
      date
    }
  }
`;

const CSPRStakedByDay = () => {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const { data, loading, error } = useQuery(TOTAL_CSPR_STAKED, {
    variables: {
      key: id,
      dateEnd: date,
      limit: 14,
    },
  });

  const rewards = [
    ...(data?.staked_amount_daily_candle_per_validator || []),
  ].reverse();

  const config: ApexCharts.ApexOptions = {
    series: [
      {
        name: "Total CSPR staked",
        type: "line",
        data: rewards.map(rew =>
          Math.round(rew.open_staked_amount / MOTE_VALUE)
        ),
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
      width: [3],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: "50%",
      },
    },
    responsive: [
      {
        breakpoint: 767,
        options: {
          stroke: {
            width: [3],
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
    labels: rewards.map(st => st.date),
    markers: {
      size: 0,
    },
    legend: {
      fontSize: "16px",
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
        text: "Total CSPR staked",
      },
    },

    tooltip: {
      shared: true,
      intersect: false,

      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return Intl.NumberFormat("us-US").format(y) + " CSPR";
          }
          return y;
        },
      },
    },
  };

  return (
    <div className="w-full overflow-y-hidden flex-nowrap">
      <Card title="Total cumulative CSPR staked by days">
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

export default CSPRStakedByDay;
