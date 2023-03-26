import React from "react";
import dynamic from "next/dynamic";
import { useGetLast14daysDeploysCount } from "../../../../hooks/useGetLast14daysDeploysCount";
import { DeployColors, isToday } from "../../../../utils/Utils";
import Card from "../../Card/Card";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TodayDeploysStatsChart = () => {
  // Queries
  const query = useGetLast14daysDeploysCount();
  if (!query.data) {
    return null;
  }

  // We want today stats
  const stats = query.data
    .filter(
      deploy => new Date(deploy.day).getUTCDate() === new Date().getUTCDate()
    )
    .sort((a, b) => b.count - a.count);

  const config: ApexCharts.ApexOptions = {
    series: stats.map(stat => stat.count),
    labels: stats.map(stat => stat.type || ""),
    colors: stats.map(stat => DeployColors[stat.type || ""]),
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
          size: "70%",
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
    <Card title="Last 24h deploys">
      <div
        id="chart"
        className="flex-col items-center justify-center w-full mx-auto"
      >
        <Chart
          options={config}
          series={config.series}
          type="donut"
          height={300}
        />
        <div className="flex-col mt-4">
          {stats.sort().map(stat => {
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
export default TodayDeploysStatsChart;
