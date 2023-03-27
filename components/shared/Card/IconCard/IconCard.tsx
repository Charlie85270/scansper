import React from "react";
import { IconType } from "react-icons/lib";
import Card from "../Card";

export interface IconCardProps {
  title: string;
  icon: IconType;
  value: number | string;
  currency?: string;
  changes?: number;
  description?: string;
}

const IconCard = ({
  title,
  value,
  description,
  icon,
  currency,
  changes,
}: IconCardProps) => {
  const changesToCompare = changes || 0;
  const isNegative = changesToCompare < 0;

  return (
    <Card title={title}>
      <div className="flex-col justify-between">
        <div className="absolute top-4 right-2">
          {icon({ className: "w-6 h-6 opacity-10" })}
        </div>
        <div className="flex-col">
          <span className="flex items-end text-2xl text-gray-800">
            {value}
            <span className="text-sm text-gray-500"> {currency}</span>
          </span>

          <span
            className={`${
              isNegative ? "text-red-400" : "text-green-400"
            } text-sm text-gray-400`}
          >
            {changes && `${changes.toFixed(2)}%`}‎
          </span>
          {description && <span className="text-gray-400">{description}</span>}
        </div>
      </div>
    </Card>
  );
};
export default IconCard;
