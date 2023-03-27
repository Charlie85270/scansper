import React from "react";
import { IconType } from "react-icons/lib";
import { formatNumber } from "../../../../utils/Utils";
import Card from "../Card";

interface Props {
  title: string;
  value: number;
  percent?: number;
  color: string;
  icon?: IconType;
}

const HomeCard = ({ title, value, percent, color }: Props) => {
  // const conf: ApexCharts.ApexOptions = {
  //   series: [
  //     Number(percentStaked.toFixed(2)),
  //     Number(percentCirculatingSupply.toFixed(2)),
  //     100,
  //   ],
  //   chart: {
  //     height: 250,
  //     width: 200,
  //     type: "radialBar",
  //   },
  //   colors: colors,
  //   plotOptions: {
  //     radialBar: {
  //       hollow: {
  //         margin: 150,
  //         size: "20%",
  //       },

  //       dataLabels: {
  //         show: true,
  //         name: {
  //           show: false,
  //           fontSize: "14px",
  //           offsetY: 5,
  //         },
  //         value: {
  //           show: true,
  //           offsetY: 5,
  //           fontSize: "12px",
  //         },
  //         total: {
  //           color: totalColor,
  //           show: false,
  //           formatter(opts) {
  //             return "100%";
  //           },
  //           label: "",
  //         },
  //       },
  //     },
  //   },
  //   stroke: {
  //     lineCap: "round",
  //   },
  //   labels: ["Staked", "Circulating", "Total"],
  // };

  return (
    <Card title={title}>
      <div className="flex-col justify-between space-y-2">
        <div className="flex items-end justify-between space-x-12">
          <span className="text-2xl text-gray-900">{formatNumber(value)}</span>
          {percent && (
            <span className="text-gray-400">{percent.toFixed(2)}%</span>
          )}
        </div>
        {percent && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="h-2.5 rounded-full"
              style={{
                width: `${percent}%`,
                backgroundColor: color,
              }}
            ></div>
          </div>
        )}
      </div>
    </Card>
  );
};
export default HomeCard;
