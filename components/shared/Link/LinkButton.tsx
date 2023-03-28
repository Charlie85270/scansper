import Link from "next/link";
import React from "react";

const LinkButton = ({ title, href, target }) => {
  return (
    <Link
      className="p-2 font-light text-center text-gray-500 border border-gray-400 rounded-md text-md hover:border-gray-700 hover:text-gray-700"
      href={href}
      target={target}
    >
      {title}
    </Link>
  );
};
export default LinkButton;
