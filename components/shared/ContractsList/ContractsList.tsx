import classNames from "classnames";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

import {
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
import { useGetContracts } from "../../../hooks/useGetContracts";

const ContractsList = () => {
  const { push, query } = useRouter();
  const { page } = query;
  const { validators } = useContext(AppContext);
  const contractsQuery = useGetContracts(page);
  const items = contractsQuery.data?.data;
  useEffect(() => {
    contractsQuery.refetch();
  }, [page]);
  // Error state
  if (contractsQuery.error || (!items && !contractsQuery.isFetching)) {
    return <ErrorMessage />;
  }

  const headers = [
    "Deployed date",
    "Name",
    "Package Hash",
    "Type",
    "30d deploys",
    "Owner",
  ];

  const rows = items?.map(item => {
    return [
      <span className="flex items-center space-x-2 text-sm">
        <span> {getRelativeDateTime({ date1: new Date(item.timestamp) })}</span>
      </span>,
      <span>{item.contract_name}</span>,
      <Link
        className="text-blue-500 hover:text-blue-900"
        href={`/contract-package/${item.contract_package_hash}?tab=deploys`}
      >
        {truncateString(item.contract_package_hash, 10)}
      </Link>,
      <div>{getTypeContract(item.contract_type_id)}</div>,
      <span>{item.deploys_num}</span>,

      <Link
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-900"
        href={`/account/${item.owner_public_key}?tab=deploys`}
      >
        <img
          className="w-6 h-6 rounded-lg"
          src={getAvatarUrl(item.owner_public_key, validators)}
        />
        <span>
          {truncateString(
            getPublicKeyName(item.owner_public_key, validators),
            10
          )}
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
        totalItems={contractsQuery.data?.itemCount || 0}
        rows={rows}
        header={headers}
      />
    </div>
  );
};

export const getTypeContract = type => {
  let contract = "";
  switch (type) {
    case 7:
      contract = "CEP-78 NFT";
      break;
    case 2:
      contract = "ERC-20";
      break;
    case 5:
      contract = "CEP-47 NFT";
      break;
    case 1:
      contract = "Auction";
      break;
    default:
      break;
  }
  return contract;
};

export default ContractsList;
