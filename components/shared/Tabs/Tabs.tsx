import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";

interface PropsTabs {
  tabs: { id: string; title: string }[];
  tabsContent: React.ReactNode[];
  resetUrlOnchange?: boolean;
}

const Tabs = ({ tabs, tabsContent, resetUrlOnchange }: PropsTabs) => {
  const { push, query } = useRouter();
  const { tab } = query;
  const currentIndex = tabs.findIndex(i => i.id === tab);

  return (
    <div className="justify-start text-base font-medium text-left text-gray-500">
      <ul className="flex flex-wrap w-full -mb-px border-b">
        {tabs.map(iTab => {
          return (
            <li
              key={iTab.id}
              className="mr-2 hover:cursor-pointer"
              role="link"
              onClick={() => {
                push(
                  {
                    query: {
                      ...query,
                      tab: iTab.id,
                      page: resetUrlOnchange ? 1 : query.page,
                    },
                  },
                  undefined,
                  {
                    shallow: true,
                  }
                );
              }}
            >
              <p
                className={classNames(
                  {
                    "border-gray-700 border-b-2 text-gray-700": iTab.id === tab,
                    "hover:border-b-2 hover:text-gray-700  hover:border-gray-700":
                      iTab.id !== tab,
                  },

                  "inline-block p-4 rounded-t-lg active"
                )}
                aria-current="page"
              >
                {iTab.title}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="my-4">{tabsContent[currentIndex || 0]}</div>
    </div>
  );
};

export default Tabs;
