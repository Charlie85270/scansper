import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

interface PropsTabs {
  tabs: { id: string; title: string }[];
  tabsContent: React.ReactNode[];
  resetUrlOnchange?: boolean;
}

const Tabs = ({ tabs, tabsContent }: PropsTabs) => {
  const { push, query } = useRouter();
  const { tab } = query;
  const currentIndex = tabs.findIndex(i => i.id === tab);

  return (
    <div className="justify-start text-base font-medium text-left text-gray-500">
      <ul className="flex flex-wrap -mb-px">
        {tabs.map(iTab => {
          return (
            <li
              className="mr-2"
              onClick={() => {
                push({ query: { ...query, tab: iTab.id } }, undefined, {
                  shallow: true,
                });
              }}
            >
              <a
                href="#"
                className={classNames(
                  {
                    "border-gray-700  border-b-2 text-gray-700":
                      iTab.id === tab,
                    "hover:border-b-2 hover:text-gray-700 hover:border-gray-700 border-b":
                      iTab.id !== tab,
                  },

                  "inline-block p-4 rounded-t-lg active"
                )}
                aria-current="page"
              >
                {iTab.title}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="my-4">{tabsContent[currentIndex || 0]}</div>
    </div>
  );
};

export default Tabs;
