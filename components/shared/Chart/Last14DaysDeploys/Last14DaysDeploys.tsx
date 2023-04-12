import React from "react";
import dynamic from "next/dynamic";
import { useGetLast14daysDeploysCount } from "../../../../hooks/useGetLast14daysDeploysCount";

import Card from "../../Card/Card";
import Loader from "../../Loader/Loader";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Last14DeploysStatsChart = () => {
  // Queries
  const query = useGetLast14daysDeploysCount();
  if (!query.data) {
    return null;
  }
  if (query.isFetching) {
    return <Loader />;
  }

  const allData = JSON.parse(JSON.stringify(query.data));
  const transfers = [...query.data]
    .filter(data => data.type === "transfer")
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
  const modules = [...query.data]
    .filter(data => data.type === "moduleBytes")
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
  const stored = [...query.data]
    .filter(data => data.type === "storedContractByHash")
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
  const storedVerion = [...query.data]
    .filter(data => data.type === "storedVersionedContractByHash")
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());

  const total: {
    day: string;
    type?: "transfer" | "storedContractByHash" | "moduleBytes";
    count: number;
  }[] = [];

  allData
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime())
    .forEach(obj => {
      const index = total.findIndex(
        o => new Date(o.day).getTime() === new Date(obj.day).getTime()
      );
      if (index === -1) {
        total.push(obj);
      } else {
        total[index].count += obj.count;
      }
    });

  const config: ApexCharts.ApexOptions = {
    series: [
      {
        name: "Transfers",
        type: "column",
        data: transfers.map(trasnfer => trasnfer.count),
      },
      {
        name: "Modules bytes",
        type: "column",
        data: modules.map(modules => modules.count),
      },
      {
        name: "Stored Contract",
        type: "column",
        data: stored.map(stored => stored.count),
      },
      {
        name: "Stored Versionned Contract",
        type: "column",
        data: storedVerion.map(stored => stored.count),
      },
      {
        name: "Total deploys",
        type: "line",
        data: total.map(t => t.count),
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
      width: [1, 1, 1, 1, 5],
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
            width: [1, 1, 1, 1, 3],
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
      opacity: [1, 1, 1, 1, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: stored.map(st => st.day),
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
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Deploys",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " deploys";
          }
          return y;
        },
      },
    },
  };

  return (
    <div
      id="chart"
      className="flex-col items-center justify-center w-full mx-auto text-primary"
    >
      <Chart options={config} series={config.series} type="line" height={400} />
    </div>
  );
};
export default Last14DeploysStatsChart;
