import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

interface AlertProps {
  text: string;
}

export const Alert = ({ text }: AlertProps) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="container relative flex items-center px-4 py-3 mb-6 text-sm border rounded dark:border-gray-900 background-card text-primary"
      role="alert"
    >
      <svg
        width="20"
        height="20"
        fill="currentColor"
        className="w-4 h-4 mr-2"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1216 1344v128q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h64v-384h-64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h384q26 0 45 19t19 45v576h64q26 0 45 19t19 45zm-128-1152v192q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-192q0-26 19-45t45-19h256q26 0 45 19t19 45z"></path>
      </svg>
      <p>{text}</p>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <IoClose
          width="16"
          height="16"
          fill="currentColor"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
};
