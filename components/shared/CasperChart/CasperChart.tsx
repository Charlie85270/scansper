import React from "react";
import dynamic from "next/dynamic";
import { useQueryClient } from "react-query";
import { useGetHistoryCasperPrice } from "../../../hooks/useGetHistoryCasperPrice";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CasperChart = () => {
  // Queries
  const query = useGetHistoryCasperPrice(1);
  if (!query.data) {
    return null;
  }

  const price = query.data.prices[0][1];
  const lastPrice = query.data.prices[query.data?.prices.length - 1][1];
  const percent = (lastPrice / price) * 100 - 100;

  const conf: ApexCharts.ApexOptions = {
    series: [
      {
        data: query.data.prices.map(data => Number(data[1].toFixed(5))),
      },
    ],
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    chart: {
      type: "line",
      height: 20,
      width: 400,

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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
      colors: [percent > 0 ? "#4ade80" : "#de4a4c"],
      width: 3,
      dashArray: 0,
    },

    tooltip: {
      x: {
        show: false,
      },
      marker: {
        show: false,
      },
      shared: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="arrow_box p-2">' +
          "<span>" +
          series[seriesIndex][dataPointIndex] +
          "$" +
          "</span>" +
          "</div>"
        );
      },
    },
    xaxis: {
      type: "numeric",
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      opposite: true,
    },
  };

  const isNegative = percent < 0;
  return (
    <div id="chart" className="p-4 rounded-3xl bg-bgApp h-45">
      <div className="flex items-center space-x-2 text-lg">
        <img src="/cspr.png" alt="casper logo" className="w-8" />
        <span className="text-gray-900">Casper</span>
        <span className="text-gray-400">CSPR</span>
      </div>

      {conf && (
        <Chart options={conf} series={conf.series} type="line" height={100} />
      )}

      <div className="flex flex-col">
        <span className="my-2 text-sm text-gray-400">Price (%24h)</span>
        <div className="flex items-center space-x-2">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isNegative ? "rotate-180" : ""}
          >
            <path
              d="M13.2194 23.0097C18.9733 23.0097 23.6546 18.3284 23.6546 12.5745C23.6546 6.82051 18.9733 2.13928 13.2194 2.13928C7.4654 2.13928 2.78418 6.82051 2.78418 12.5745C2.78418 18.3284 7.4654 23.0097 13.2194 23.0097ZM13.2194 7.35688L18.437 12.5745H14.2629V17.7921H12.1758V12.5745H8.00177L13.2194 7.35688Z"
              fill={isNegative ? "#cd7070" : "#70CD97"}
            />
          </svg>
          <div className="flex items-end space-x-2">
            <span className="text-2xl text-gray-900">{price.toFixed(4)}$</span>
            <span
              className={`${
                isNegative ? "text-red-400" : "text-green-400"
              } text-sm text-gray-400`}
            >
              {percent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CasperChart;
