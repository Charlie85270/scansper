import React from "react";
import dynamic from "next/dynamic";
import { useGetHistoryCasperPrice } from "../../../../hooks/useGetHistoryCasperPrice";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CasperPriceChart = () => {
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
      width: 300,
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
      axisTicks: { show: false },
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
    <div id="chart" className="p-4 rounded-md background-app h-45">
      <div className="flex items-center space-x-2 text-lg">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
          width="12px"
          alt="cspr"
        />
        <span className="text-primary">Casper</span>
        <span className="text-secondary">CSPR</span>
      </div>

      {conf && (
        <Chart options={conf} series={conf.series} type="line" height={100} />
      )}

      <div className="flex flex-col">
        <span className="my-2 text-sm text-secondary">Price (%24h)</span>
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
            <span className="text-xl text-primary">
              {lastPrice.toFixed(4)}$
            </span>
            <span
              className={`${
                isNegative ? "text-red-400" : "text-green-400"
              } text-sm text-secondary`}
            >
              {percent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CasperPriceChart;
