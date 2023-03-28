import React from "react";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";

interface TableProps {
  header: string[];
  rows: React.ReactNode[][];
  isLoading?: boolean;
}

const Table = ({ header, rows, isLoading }: TableProps) => {
  return (
    <table className="min-w-full bg-white rounded-md shadow leading-norma">
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
          rows.map(row => {
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
  );
};

export default Table;
