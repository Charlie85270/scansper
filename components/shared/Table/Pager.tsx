import classNames from "classnames";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface PagerProps {
  totalItems: number;
  onChangePage?: (page: number) => void;
  currentPage: number;
  pageSize: number;
}

const Pager = ({
  totalItems,
  onChangePage,
  currentPage,
  pageSize,
}: PagerProps) => {
  const getPager = (
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 12
  ) => {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    const maxNumberPageToDisplay = 4;

    var startPage = 0,
      endPage = 0;
    if (totalPages <= maxNumberPageToDisplay) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= maxNumberPageToDisplay / 2 + 1) {
        startPage = 1;
        endPage = maxNumberPageToDisplay;
      } else if (currentPage + (maxNumberPageToDisplay / 2 - 1) >= totalPages) {
        startPage = totalPages - maxNumberPageToDisplay - 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxNumberPageToDisplay / 2;
        endPage = currentPage + (maxNumberPageToDisplay / 2 - 1);
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    const pages: number[] = [];
    for (var i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  };

  const pager = getPager(totalItems, currentPage, pageSize);

  const [pageSet, setPageSet] = useState("");
  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pager if there is only 1 page
    return null;
  }

  return (
    <div className="flex flex-col items-center px-5 background-card xs:flex-row xs:justify-between">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onChangePage && onChangePage(pager.currentPage - 1)}
          disabled={pager.currentPage === 1}
          className={classNames(
            { "opacity-60": pager.currentPage === pager.totalPages },
            "w-full p-4 text-base text-gray-600 background-app hover:text-primary border-t border-b border-l rounded-l-lg dark:border-gray-800"
          )}
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
        {pager.startPage !== 1 && (
          <>
            <button
              key="first"
              onClick={() => onChangePage && onChangePage(1)}
              type="button"
              className={classNames(
                "w-full px-3 py-2 md:px-4 text-base background-app hover:text-primary border-t border-b dark:border-gray-800 "
              )}
            >
              {1}
            </button>
            <button
              key="more"
              disabled
              type="button"
              className={classNames(
                "w-full px-3 py-2 md:px-4 text-secondary text-base background-app hover:text-primary border-t border-b dark:border-gray-800 "
              )}
            >
              ...
            </button>
          </>
        )}
        {pager.pages.map((page, index) => (
          <button
            key={index}
            onClick={() => onChangePage && onChangePage(page)}
            type="button"
            className={classNames(
              {
                "text-primary background-card": pager.currentPage === page,
                "text-secondary background-app": pager.currentPage !== page,
              },
              "w-full px-3 py-2 md:px-4 text-base border-t hover:text-primary border-b dark:border-gray-800 "
            )}
          >
            {page}
          </button>
        ))}
        {pager.endPage < pager.totalPages && (
          <>
            <button
              key="more"
              disabled
              type="button"
              className={classNames(
                "w-full px-3 py-2 md:px-4 text-secondary text-base background-app hover:text-primary border-t border-b dark:border-gray-800 "
              )}
            >
              ...
            </button>
            <button
              key="last"
              onClick={() => onChangePage && onChangePage(pager.totalPages)}
              type="button"
              className={classNames(
                "w-full px-3 py-2 md:px-4  text-secondary text-base background-app hover:text-primary border-t border-b dark:border-gray-800"
              )}
            >
              {pager.totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => onChangePage && onChangePage(pager.currentPage + 1)}
          disabled={pager.currentPage === pager.totalPages}
          className={classNames(
            { "opacity-60": pager.currentPage === pager.totalPages },
            "w-full p-4 text-base  text-gray-600 background-app hover:text-primary border-t border-b border-r dark:border-gray-800 rounded-r-lg "
          )}
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
      </div>
      <div className="flex items-center mt-2 text-secondary">
        <label>
          Go to page
          <input
            type="number"
            min={1}
            className="w-16 px-3 py-2 ml-1 border-t border-b border-l rounded-l text-secondary dark:border-gray-900 background-card"
            value={pageSet}
            onChange={e => setPageSet(e.target.value)}
            max={pager.totalPages}
          />
        </label>
        <button
          className={classNames(
            {
              "opacity-50": !pageSet,
              "hover:background-app": Boolean(pageSet),
            },
            "background-card border rounded-r  px-3 py-3 dark:border-gray-900"
          )}
          onClick={() => onChangePage && onChangePage(Number(pageSet))}
          disabled={!pageSet}
        >
          <FiSearch />
        </button>
      </div>
    </div>
  );
};

export default Pager;
