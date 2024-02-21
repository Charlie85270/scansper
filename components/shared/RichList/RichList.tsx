import Link from "next/link";
import React, { useContext, useEffect } from "react";
import {
  formatNumber,
  getAvatarUrl,
  getPublicKeyName,
  MOTE_VALUE,
} from "../../../utils/Utils";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Table from "../Table/Table";
import { useRouter } from "next/router";
import AppContext from "../../../AppContext";
import { useGetRichList } from "../../../hooks/useGetRichList";
import { useGetHistoryCasperPrice } from "../../../hooks/useGetHistoryCasperPrice";
import { useGetCasperSupplyInfo } from "../../../hooks/useGetCasperSupplyInfo";
import { useQuery } from "@apollo/client";
import { RICH_LIST } from "../../../services/graphqlQueries";
import Loader from "../Loader/Loader";

const RichList = () => {
  const { push, query } = useRouter();
  const { page } = query;

  const querySupply = useGetCasperSupplyInfo();
  const totalSupply = querySupply.data?.data.total || 0;

  const headers = ["Rank", "Public Key", "Balance", "Percentage"];
  const price = useGetHistoryCasperPrice(1);
  const casperPrice = price.data?.prices[price.data?.prices.length - 1][1] || 0;

  const { data, loading, refetch, error } = useQuery(RICH_LIST, {
    variables: {
      page: Number(page) || 1,
      size: 20,
    },
    context: { clientName: "stats" },
  });

  const items = data?.searchRichlist.items;
  const totalItems = data?.searchRichlist.total;
  const { validators } = useContext(AppContext);
  useEffect(() => {
    refetch();
  }, [page]);
  // Error state
  if (error || (!items && !loading)) {
    return <ErrorMessage />;
  }

  const rows = items?.map((item, index) => {
    const public_key = item.address.publicKey || item.address.accountHash;
    const totalBalance =
      Number(item.balance) + Number(item.totalStakedAsDelegator);
    return [
      <p>{(Number(page || 1) - 1) * 20 + index + 1}</p>,
      <Link
        className="flex items-center space-x-2 text-blue-500"
        href={`/account/${public_key}?tab=deploys`}
      >
        <img
          className="w-6 h-6 rounded-full"
          src={getAvatarUrl(public_key, validators)}
        />
        <span className="truncate">
          {getPublicKeyName(public_key, validators)}
        </span>
      </Link>,
      <div>
        <span className="flex items-center space-x-2">
          <span className="text-primary text-md">
            {formatNumber(Number(Number(totalBalance / MOTE_VALUE).toFixed(0)))}
          </span>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
            width="12px"
            alt="cspr"
          />
        </span>
        <span className="text-xs text-secondary">
          {formatNumber(
            Number(Number((totalBalance / MOTE_VALUE) * casperPrice).toFixed(0))
          )}
          $
        </span>
      </div>,
      <span className="">
        {(
          (Number(Number(totalBalance / MOTE_VALUE).toFixed(0)) * 100) /
          totalSupply
        ).toFixed(2)}
        %
      </span>,
    ];
  });

  return (
    <div className="w-full overflow-y-hidden text-primary flex-nowrap">
      <Table
        showTotalItems
        showPagination
        isLoading={loading}
        pageSize={20}
        currentPage={Number(page) || 1}
        onPageChange={(page) => {
          push({ query: { ...query, page } }, undefined, {
            shallow: true,
          });
        }}
        totalItems={totalItems}
        rows={rows}
        header={headers}
      />
    </div>
  );
};

export default RichList;
