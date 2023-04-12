import React from "react";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import Pager from "./Pager";

interface TableProps {
  header: string[];
  rows: JSX.Element[][] | undefined;
  isLoading?: boolean;
  showPagination?: boolean;
  onPageChange?: (page: number) => void;
  totalItems: number;
  currentPage?: number;
  pageSize?: number;
  showTotalItems?: boolean;
}

const Table = ({
  header,
  rows,
  isLoading,
  showPagination,
  currentPage,
  onPageChange,
  totalItems,
  showTotalItems,
  pageSize,
}: TableProps) => {
  return (
    <div>
      <div className="w-full overflow-y-hidden flex-nowrap">
        <table className="min-w-full">
          <thead>
            <tr>
              {header.map(head => {
                return (
                  <th
                    key={head}
                    scope="col"
                    className="px-5 py-5 font-semibold text-left text-gray-700 border-b border-gray-200 dark:text-gray-100 dark:border-gray-900 background-card text-md"
                  >
                    {head}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  className="justify-center p-4 text-center bg-gray-200 h-72 animate-pulse"
                  colSpan={header.length}
                >
                  <Loader />
                </td>
              </tr>
            ) : (
              rows?.map((row, index) => {
                return (
                  <tr key={index}>
                    {row.map(r => {
                      return (
                        <td className="px-5 py-3 text-base border-b border-gray-200 dark:border-gray-900 background-card">
                          {r}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {showTotalItems && (
        <p className="w-full py-3 text-sm text-center text-secondary">
          {totalItems} results
        </p>
      )}
      {showPagination && (
        <div className="mt-2">
          <Pager
            totalItems={totalItems}
            pageSize={pageSize || 10}
            currentPage={currentPage || 1}
            onChangePage={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
