import Link from "next/link";
import React, { useContext, useEffect } from "react";
import {
  formatNumber,
  getAvatarUrl,
  getPublicKeyName,
  getRelativeDateTime,
  truncateString,
} from "../../../utils/Utils";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Table from "../Table/Table";
import { useRouter } from "next/router";
import { pageSize } from "../../../services/httpReq";
import AppContext from "../../../AppContext";
import { useGetBlocks } from "../../../hooks/useGetBlocks";

interface DeployListProps {
  pubicKey?: string;
  isAccount?: boolean;
}

const BlocksList = ({ pubicKey, isAccount }: DeployListProps) => {
  const { push, query } = useRouter();

  const { page } = query;

  const blocksQuery = useGetBlocks(page);
  const items = blocksQuery.data?.data;
  useEffect(() => {
    blocksQuery.refetch();
  }, [page]);
  // Error state
  if (blocksQuery.error || (!items && !blocksQuery.isFetching)) {
    return <ErrorMessage />;
  }

  const headers = [
    "Date",
    "Block height",
    "Era",
    "Deploys",
    "Block hash",
    "Validator",
  ];
  const { validators } = useContext(AppContext);
  const rows = items?.map(item => {
    return [
      <span className="flex items-center space-x-2 text-sm">
        <span> {getRelativeDateTime({ date1: new Date(item.timestamp) })}</span>
      </span>,
      <span>{formatNumber(item.blockHeight)}</span>,
      <span>{item.eraId}</span>,
      <span>{item.deployCount + item.transferCount}</span>,
      <Link
        className="text-blue-500 hover:text-blue-900"
        href={`/block/${item.blockHash}?tab=deploys`}
      >
        {truncateString(item.blockHash, 10)}
      </Link>,

      <Link
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-900"
        href={`/validator/${item.proposer}?tab=delegators`}
      >
        <img
          className="w-6 h-6 rounded-full"
          src={getAvatarUrl(item.proposer, validators)}
        />
        <span>
          {truncateString(getPublicKeyName(item.proposer, validators), 10)}
        </span>
      </Link>,
    ];
  });

  return (
    <div className="w-full overflow-y-hidden text-primary flex-nowrap">
      <Table
        showTotalItems
        showPagination
        pageSize={pageSize}
        currentPage={Number(page) || 1}
        onPageChange={page => {
          push({ query: { ...query, page } }, undefined, {
            shallow: true,
          });
        }}
        totalItems={blocksQuery.data?.itemCount || 0}
        rows={rows}
        header={headers}
      />
    </div>
  );
};

export default BlocksList;
