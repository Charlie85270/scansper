import React from "react";

interface Props {
  message?: string;
}

const ErrorMessage = ({
  message = "An error occured, please retry later",
}: Props) => {
  return (
    <div className="flex items-center py-4 space-x-4">
      <p className="text-xl italic text-red-500">{message}</p>
    </div>
  );
};

export default ErrorMessage;
