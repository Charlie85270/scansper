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
      <table className="min-w-full">
        <thead>
          <tr>
            {header.map(head => {
              return (
                <th
                  scope="col"
                  className="px-5 py-5 font-semibold text-left text-gray-700 bg-white border-b border-gray-200 text-md"
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
            rows?.map(row => {
              return (
                <tr>
                  {row.map(r => {
                    return (
                      <td className="px-5 py-3 text-base bg-white border-b border-gray-200">
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
      {showTotalItems && (
        <p className="w-full py-3 text-sm text-center text-gray-400">
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
