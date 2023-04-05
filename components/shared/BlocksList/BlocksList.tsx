import classNames from "classnames";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { BiTransfer } from "react-icons/bi";
import { FiLock, FiUnlock } from "react-icons/fi";
import { useGetDeploys } from "../../../hooks/useGetDeploys";
import { getExecutionTypeById } from "../../../types/deploys";
import { GoFileCode } from "react-icons/go";
import { GiWarPick } from "react-icons/gi";
import {
  formatNumber,
  getAvatarUrl,
  getPublicKeyName,
  getRelativeDateTime,
  MOTE_VALUE,
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
        href={`/block/${item.blockHash}`}
      >
        {truncateString(item.blockHash, 10)}
      </Link>,

      <Link
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-900"
        href={`/account/${item.proposer}?tab=deploys`}
      >
        <img
          className="w-6 h-6 rounded-lg"
          src={getAvatarUrl(item.proposer, validators)}
        />
        <span>
          {truncateString(getPublicKeyName(item.proposer, validators), 10)}
        </span>
      </Link>,
    ];
  });

  return (
    <div className="w-full overflow-y-hidden flex-nowrap">
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
        totalItems={blocksQuery.data?.itemCount || 1}
        rows={rows}
        header={headers}
      />
    </div>
  );
};

export default BlocksList;
