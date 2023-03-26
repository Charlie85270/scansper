import React from "react";
import { IconType } from "react-icons/lib";
import Card from "../Card";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export interface IconCardProps {
  title: string;
  icon: IconType;
  up: number;
  down: number;
}

const SentimentCard = ({ title, up, icon, down }: IconCardProps) => {
  return (
    <Card title={title}>
      <div className="flex-col justify-between">
        <div className="absolute top-4 right-2">
          {icon({ className: "w-6 h-6 opacity-10" })}
        </div>
        <div className="flex items-center justify-between">
          <span className="flex flex-col items-center items-end text-2xl text-green-400">
            <span>{up}%</span>
            <span>
              <FaThumbsUp />
            </span>
          </span>
          <span className="flex flex-col items-center items-end text-2xl text-red-400">
            <span>{down}%</span>
            <span>
              <FaThumbsDown />
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
};
export default SentimentCard;
