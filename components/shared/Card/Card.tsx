import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: Props) => {
  return (
    <div className="relative flex flex-col justify-between w-full p-4 space-y-4 bg-white shadow rounded-3xl">
      <span className="text-gray-400">{title}</span>
      {children}
    </div>
  );
};
export default Card;
