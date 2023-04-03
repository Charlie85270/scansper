import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useGetBlockssByValidator } from "../../../hooks/useGetBlocksByValidator";
import {
  formatNumber,
  getRelativeTime,
  MOTE_VALUE,
  truncateString,
} from "../../../utils/Utils";
import Table from "../Table/Table";

const BlocksByValidatorsList = () => {
  const { push, query } = useRouter();
  const { id } = query;
  const { page } = query;

  const queryBlocks = useGetBlockssByValidator(
    id?.toString() || "",
    Number(page)
  );

  useEffect(() => {
    queryBlocks.refetch();
  }, [page]);

  const headers = ["Block height", "Era", "Age", "Deploy", "Hash"];
  const rows = queryBlocks.data?.data.map(item => {
    return [
      <p className="text-gray-500 ">{item.blockHeight}</p>,
      <p className="text-gray-500 ">{item.eraId}</p>,

      <span> {getRelativeTime(new Date(item.timestamp))}</span>,
      <p className="text-gray-500 ">{item.deployCount}</p>,
      <Link
        className="text-blue-500 hover:text-blue-900"
        href={`/block/${item.blockHash}`}
      >
        {truncateString(item.blockHash, 10)}
      </Link>,
    ];
  });
  return (
    <Table
      showTotalItems
      totalItems={queryBlocks.data?.itemCount || 1}
      pageSize={12}
      showPagination
      currentPage={Number(page) || 1}
      onPageChange={page => {
        push({ query: { ...query, page } }, undefined, {
          shallow: true,
        });
      }}
      rows={rows}
      header={headers}
    />
  );
};

export default BlocksByValidatorsList;
