import React from "react";
import dynamic from "next/dynamic";
import { useGetLast14daysDeploysCount } from "../../../../hooks/useGetLast14daysDeploysCount";
import { DeployColors, isToday } from "../../../../utils/Utils";
import Card from "../../Card/Card";
import Loader from "../../Loader/Loader";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  isLoading?: boolean;
  data: { count: number; type: string; color: string }[];
}

const DistributionChart = ({ isLoading, data }: Props) => {
  if (isLoading) {
    return <Loader />;
  }

  const config: ApexCharts.ApexOptions = {
    series: data.map(stat => stat.count),
    labels: data.map(stat => stat.type || ""),
    colors: data.map(stat => stat.color || ""),
    chart: {
      type: "donut",
      width: 300,
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          chart: {
            width: 400,
            height: 400,
          },
        },
      },
      {
        breakpoint: 767,
        options: {
          chart: {
            width: 300,
            height: 300,
          },
        },
      },
    ],
    legend: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
    },
    grid: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
          labels: {
            show: true,
            total: {
              show: true,
            },
          },
        },
      },
    },
  };

  return (
    <Card title="Last 24h deploys (UTC)">
      <div
        id="chart"
        className="flex-col items-center justify-center w-full mx-auto"
      >
        {data && (
          <Chart
            options={config}
            series={config.series}
            type="donut"
            height={300}
          />
        )}

        <div className="flex-col mt-4">
          {data.sort().map(stat => {
            return (
              <div className="flex items-center space-x-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: DeployColors[stat.type || ""] }}
                ></div>
                <p
                  className="text-lg capitalize"
                  style={{ color: DeployColors[stat.type || ""] }}
                >
                  {stat.type} <span>({stat.count})</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
export default DistributionChart;
