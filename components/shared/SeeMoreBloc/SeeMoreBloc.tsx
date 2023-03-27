import React from "react";
import LinkButton from "../Link/LinkButton";

const SeeMoreBloc = ({ title, href, children }) => {
  return (
    <div className="pt-8">
      <div className="flex items-center justify-between w-full pb-4">
        <p className="w-1/2 text-2xl text-gray-800">{title}</p>
        {href && (
          <LinkButton title="See all" href={href} target="_self"></LinkButton>
        )}
      </div>
      {children}
    </div>
  );
};
export default SeeMoreBloc;
