import React, { useState } from "react";

import AppLayout from "../../../components/layout/AppLayout";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { gql, useQuery } from "@apollo/client";

import dynamic from "next/dynamic";

const ACTIVE_CONTRACTS_BY_DAY_QUERY = gql`
  query GetCreatedWalletByDay($date: date) {
    account_daily_creation_from_202206(where: { initial_day: { _gt: $date } }) {
      count
      initial_day
    }
  }
`;

interface Data {
  count: number;
  initial_day: string;
}

export const AccountsStats = () => {
  const d = new Date();
  d.setDate(d.getDate() - 14);

  const [date, setDate] = useState(d.toISOString().split("T")[0]);

  const { data, loading, error } = useQuery(ACTIVE_CONTRACTS_BY_DAY_QUERY, {
    variables: {
      date,
    },
  });

  const datas: Data[] = data?.account_daily_creation_from_202206 || [];

  const config: ApexCharts.ApexOptions = {
    series: [
      {
        name: "New account",
        type: "column",
        data: datas?.map(data => data.count),
      },
      {
        name: "Average account created by day since launch",
        type: "line",
        data: datas.map(_ => 122),
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
      width: [1, 4],
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
    labels: datas.map(st => st.initial_day),
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
        text: "Accounts creations",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " creations";
          }
          return y;
        },
      },
    },
  };

  return (
    <AppLayout
      title="Scansper | Top active wallet by day / month"
      desc="List of the top active accounts of the Casper Network"
    >
      <Chart options={config} series={config.series} type="line" height={400} />
    </AppLayout>
  );
};

export default AccountsStats;
