import classNames from "classnames";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import {
  formatNumber,
  getPublicKeyName,
  getAvatarUrl,
  getRelativeDateTime,
  MOTE_VALUE,
  truncateString,
} from "../../../utils/Utils";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Table from "../Table/Table";
import { useRouter } from "next/router";
import { pageSize } from "../../../services/httpReq";
import { useGetTransfersByAccount } from "../../../hooks/useGetTransfersByAccount";
import AppContext from "../../../AppContext";

interface DeployListProps {
  accountHash?: string;
  isAccount?: boolean;
}

const TransfersList = ({ accountHash }: DeployListProps) => {
  const { push, query } = useRouter();
  const { validators } = useContext(AppContext);
  const { page } = query;

  const transfersQuery = useGetTransfersByAccount(accountHash, page);

  const items = transfersQuery.data?.data;
  useEffect(() => {
    transfersQuery.refetch();
  }, [page]);
  // Error state
  if (transfersQuery.error || (!items && !transfersQuery.isFetching)) {
    return <ErrorMessage />;
  }

  const headers = [
    "Date",
    "Deploy Hash",
    "Block",
    "From",
    "To",
    "Transfer ID",
    "Amount",
  ];

  const rows = items?.map(item => {
    return [
      <div className="flex items-center w-24 space-x-2 text-sm">
        <DeployStatus />
        <span> {getRelativeDateTime({ date1: new Date(item.timestamp) })}</span>
      </div>,
      <Link
        className="text-sm text-blue-500 hover:text-blue-900"
        href={`/deploy/${item.deployHash}`}
      >
        {truncateString(item.deployHash, 10)}
      </Link>,
      <Link
        className="text-sm text-blue-500 hover:text-blue-900"
        href={`/block/${item.blockHash}?tab=deploys`}
      >
        {truncateString(item.blockHash, 10)}
      </Link>,
      <Link
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-900"
        href={`/account/${item.fromAccountPublicKey}?tab=deploys`}
      >
        <img
          className="w-8 h-8 rounded-lg"
          src={getAvatarUrl(item.fromAccountPublicKey, validators)}
        />
        <span>
          {truncateString(getPublicKeyName(item.fromAccountPublicKey), 10)}
        </span>
      </Link>,

      <Link
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-900"
        href={`/account/${
          item.toAccountPublicKey || item.toAccount
        }?tab=deploys`}
      >
        <img
          className="w-8 h-8 rounded-lg"
          src={getAvatarUrl(
            item?.toAccountPublicKey || item.toAccount,
            validators
          )}
        />
        <span>
          {truncateString(
            getPublicKeyName(
              item.toAccountPublicKey || item.toAccount,
              validators
            ),
            10
          )}
        </span>
      </Link>,
      <div className="text-secondary">{item.transferId}</div>,
      <div>
        <span className="flex items-center space-x-2">
          <span className="text-primary text-md">
            {formatNumber(Number(item.amount) / MOTE_VALUE)}
          </span>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
            width="12px"
            alt="cspr"
          />
        </span>
        <span className="text-xs text-secondary">
          {formatNumber((Number(item.amount) / MOTE_VALUE) * item.rate)}$
        </span>
      </div>,
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
        totalItems={transfersQuery.data?.itemCount || 0}
        rows={rows}
        header={headers}
      />
    </div>
  );
};

const DeployStatus = props => {
  return (
    <div
      className={classNames(
        {
          "bg-red-400": props.errorMessage,
          "bg-green-400": !props.errorMessage,
        },
        "w-2 h-2 rounded-full"
      )}
    />
  );
};

export default TransfersList;
