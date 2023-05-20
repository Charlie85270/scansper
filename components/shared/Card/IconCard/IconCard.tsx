import React from "react";
import { IconType } from "react-icons/lib";
import Card from "../Card";

export interface IconCardProps {
  title: string;
  icon: IconType;
  value: number | string;
  currency?: string | any;
  changes?: number;
  description?: string;
  isAnimate?: boolean;
}

const IconCard = ({
  title,
  value,
  description,
  icon,
  currency,
  changes,
  isAnimate,
}: IconCardProps) => {
  const changesToCompare = changes || 0;
  const isNegative = changesToCompare < 0;

  return (
    <Card title={title}>
      <div className="flex-col justify-between ">
        {isAnimate && (
          <span className="absolute inline-flex w-1 h-1 rounded-full opacity-75 bg-sky-400 bottom-4 right-4 animate-ping"></span>
        )}
        <div className="absolute top-4 right-2">
          {icon({ className: "w-6 h-6 opacity-10" })}
        </div>
        <div className="flex-col">
          <span className="flex items-center space-x-2 text-2xl text-primary">
            {value}
            <span className="ml-2 text-sm text-gray-500"> {currency}</span>
          </span>

          <span
            className={`${
              isNegative ? "text-red-400" : "text-green-400"
            } text-sm text-secondary`}
          >
            {changes && `${changes.toFixed(2)}%`}‎
          </span>
          {description && <span className="text-secondary">{description}</span>}
        </div>
      </div>
    </Card>
  );
};
export default IconCard;
