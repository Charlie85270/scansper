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

const TOTAL_REWARDS_ERAS = gql`
  query MyQuery($key: String, $eraStart: bigint, $eraEnd: bigint) {
    rewards_era_cumulative_per_validator(
      where: {
        validator_public_key: { _eq: $key }
        era: { _gt: $eraStart, _lte: $eraEnd }
      }
      order_by: { era: asc }
    ) {
      era
      era_cumulative_validator_rewards
    }
  }
`;

const RewardsByEra = () => {
  const statusInfos = useGetStatusInfos();
  const { theme } = useTheme();
  const eraDefault =
    statusInfos.data?.result.last_added_block_info.era_id || undefined;
  const [eraEndTemp, setEraEndTemp] = useState(eraDefault);

  useEffect(() => {
    setEraEndTemp(eraDefault);
  }, [eraDefault]);

  const [eraEnd, setEraEnd] = useState(eraDefault);
  const pagination_size = 20;
  const router = useRouter();
  const { id } = router.query;
  const eraStart = eraEnd ? eraEnd - pagination_size : undefined;
  const { data, loading, error } = useQuery(TOTAL_REWARDS_ERAS, {
    skip: !eraDefault,
    variables: {
      key: id,
      eraStart,
      eraEnd: eraEnd,
    },
  });

  const rewards = data?.rewards_era_cumulative_per_validator || [];

  const config: ApexCharts.ApexOptions = {
    series: [
      {
        name: "Total validator rewards",
        type: "line",
        data: rewards.map(rew =>
          Math.round(rew.era_cumulative_validator_rewards / MOTE_VALUE)
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
    labels: rewards.map(st => st.era),
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
        text: "Total validator rewards",
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
      <Card title="Total cumulative validator rewards by ERA" key={eraEnd}>
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
          <label>
            Select Era
            <input
              type="number"
              min={20}
              className="w-32 px-3 py-2 ml-1 border-t border-b border-l rounded-l text-secondary dark:border-gray-900 background-card"
              value={eraEndTemp}
              onChange={e => setEraEndTemp(Number(e.target.value))}
              max={eraDefault}
            />
          </label>
          <button
            className={classNames(
              "background-card border rounded-r  px-3 py-3 dark:border-gray-900"
            )}
            onClick={() => setEraEnd(Number(eraEndTemp))}
          >
            <FiSearch />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default RewardsByEra;
