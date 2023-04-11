import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import AppContext from "../../../AppContext";
import { useGetHistoryCasperPrice } from "../../../hooks/useGetHistoryCasperPrice";
import { useGetValidatorsListByDelegator } from "../../../hooks/useGetValidatorsListByDelegator";
import {
  formatNumber,
  getAvatarUrl,
  getPublicKeyName,
  MOTE_VALUE,
  truncateString,
} from "../../../utils/Utils";
import Table from "../Table/Table";

const DelegatorsByValidatorsList = () => {
  const { push, query } = useRouter();
  const { id } = query;
  const { page } = query;
  const price = useGetHistoryCasperPrice(1);
  const casperPrice = price.data?.prices[price.data?.prices.length - 1][1] || 0;
  const { validators } = useContext(AppContext);
  const queryValidator = useGetValidatorsListByDelegator(
    id?.toString() || "",
    Number(page)
  );

  useEffect(() => {
    queryValidator.refetch();
  }, [page]);

  const headers = ["Public key", "Total delegated"];
  const rows = queryValidator.data?.data.map(item => {
    return [
      <Link
        className="flex items-center space-x-2 text-base font-normal text-blue-500 truncate hover:text-blue-900"
        href={`/account/${item.public_key}?tab=deploys`}
      >
        <img
          className="w-8 h-8 rounded-lg"
          src={getAvatarUrl(item.public_key, validators)}
        />
        <span className="hidden lg:block">
          {truncateString(getPublicKeyName(item.public_key, validators), 45)}
        </span>
        <span className="truncate lg:hidden">
          {truncateString(getPublicKeyName(item.public_key, validators), 15)}
        </span>
      </Link>,
      <div>
        <span className="flex items-center space-x-2">
          <span className="text-gray-800 text-md">
            {formatNumber(
              Number(
                (Number(Number(item.stake).toFixed(2)) / MOTE_VALUE).toFixed(0)
              )
            )}
          </span>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
            width="12px"
            alt="cspr"
          />
        </span>
        <span className="text-xs text-gray-400">
          {formatNumber(
            Number(
              Number((Number(item?.stake) / MOTE_VALUE) * casperPrice).toFixed(
                0
              )
            )
          )}
          $
        </span>
      </div>,
    ];
  });
  return (
    <div className="w-full overflow-y-hidden flex-nowrap">
      <Table
        showTotalItems
        totalItems={queryValidator.data?.itemCount || 0}
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
    </div>
  );
};

export default DelegatorsByValidatorsList;
