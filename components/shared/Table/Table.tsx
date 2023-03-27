import React from "react";
import Card from "../Card/Card";

interface TableProps {
  header: string[];
  rows: React.ReactNode[][];
}

const Table = ({ header, rows }: TableProps) => {
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
        {rows.map(row => {
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
        })}
      </tbody>
    </table>
  );
};

export default Table;
