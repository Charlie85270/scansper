import classNames from "classnames";
import React from "react";

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

  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pager if there is only 1 page
    return null;
  }

  return (
    <div className="flex flex-col items-center px-5 bg-white xs:flex-row xs:justify-between">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onChangePage && onChangePage(pager.currentPage - 1)}
          disabled={pager.currentPage === 1}
          className={classNames(
            { "opacity-60": pager.currentPage === pager.totalPages },
            "w-full p-4 text-base text-gray-600 bg-white border-t border-b border-l rounded-l-lg hover:bg-gray-100"
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
                "w-full px-4 py-2 text-base bg-white border-t border-b hover:bg-gray-100 "
              )}
            >
              {1}
            </button>
            <button
              key="more"
              disabled
              type="button"
              className={classNames(
                "w-full px-4 py-2 text-base bg-white border-t border-b hover:bg-gray-100 "
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
              { "text-gray-900 bg-gray-100": pager.currentPage === page },
              "w-full px-4 py-2 text-base border-t border-b hover:bg-gray-100 "
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
                "w-full px-4 py-2 text-base bg-white border-t border-b hover:bg-gray-100 "
              )}
            >
              ...
            </button>
            <button
              key="last"
              onClick={() => onChangePage && onChangePage(pager.totalPages)}
              type="button"
              className={classNames(
                "w-full px-4 py-2 text-base bg-white border-t border-b hover:bg-gray-100 "
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
            "w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-lg hover:bg-gray-100"
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
    </div>
  );
};

export default Pager;
