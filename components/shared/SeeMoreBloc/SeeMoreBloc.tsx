import React from "react";
import LinkButton from "../Link/LinkButton";

interface SeeMoreBlocProps {
  title: string;
  href?: string;
  children: React.ReactNode;
}

const SeeMoreBloc = ({ title, href, children }: SeeMoreBlocProps) => {
  return (
    <div className="pt-8">
      <div className="flex items-center justify-between w-full pb-4">
        <p className="w-1/2 text-2xl text-primary">{title}</p>
        {href && (
          <LinkButton title="See all" href={href} target="_self"></LinkButton>
        )}
      </div>
      {children}
    </div>
  );
};
export default SeeMoreBloc;
