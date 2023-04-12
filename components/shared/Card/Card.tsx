import classNames from "classnames";
import Link from "next/link";
import React from "react";
import LinkButton from "../Link/LinkButton";
import { IoMdArrowBack } from "react-icons/io";
interface Props {
  title?: string;
  children: React.ReactNode;
  backLink?: string;
  backLabel?: string;
  titleSize?: "default" | "large";
}

const Card = ({ title, children, titleSize, backLabel, backLink }: Props) => {
  return (
    <div className="relative flex flex-col justify-between w-full p-4 space-y-4 border rounded-md dark:border-gray-900 background-card">
      <div className="flex items-center justify-between">
        {title && (
          <span
            className={classNames(
              { "text-xl": titleSize === "large" },
              "text-sm text-secondary"
            )}
          >
            {title}
          </span>
        )}
        {backLink && backLabel && (
          <LinkButton
            icon={IoMdArrowBack}
            title={backLabel}
            href={backLink}
            target="_self"
          />
        )}
      </div>
      {children}
    </div>
  );
};
export default Card;
