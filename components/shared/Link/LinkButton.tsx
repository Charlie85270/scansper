import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  href: string;
  target: string;
  icon?: any;
}

const LinkButton = ({ title, href, target, icon }: Props) => {
  return (
    <Link
      className="flex items-center p-2 space-x-3 font-light text-center border border-gray-400 rounded-md text-primary text-md hover:border-gray-700 hover:text-gray-700"
      href={href}
      target={target}
    >
      {icon && icon()}
      <span>{title}</span>
    </Link>
  );
};
export default LinkButton;
