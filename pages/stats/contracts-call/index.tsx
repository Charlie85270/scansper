import Link from "next/link";
import React, { useState } from "react";
import AppLayout from "../../../components/layout/AppLayout";
import Card from "../../../components/shared/Card/Card";
import Table from "../../../components/shared/Table/Table";
import { formatNumber, truncateString } from "../../../utils/Utils";
import { gql, useQuery } from "@apollo/client";
import IconCard from "../../../components/shared/Card/IconCard/IconCard";
import { AiOutlineBarChart } from "react-icons/ai";
import Loader from "../../../components/shared/Loader/Loader";
import { Alert } from "../../../components/shared/Alert/Alert";

const ACTIVE_CONTRACTS_BY_DAY_QUERY = gql`
  query GetActiveWalletsByDay($date: date) {
    deploy_stats_combined_view(
      order_by: { number_of_deploy: desc }
      where: { date: { _eq: $date } }
    ) {
      contrat_package
      name
      contract_hash
      number_of_deploy
      sum_cost_cspr
    }
  }
`;

interface Data {
  sum_cost_cspr: number;
  number_of_deploy: number;
  contract_hash: string;
  contract_package: string;
  name: string;
}

const getName = (hash: string) => {
  switch (hash.toLocaleLowerCase()) {
    case "ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea":
      return "Auction (Delegate / Undelegate)";
    case "fa64806972777d6263dea1f0e5a908620ffd19113df57ebd9ea4aa4e23de6090":
      return "Friendly Market";
    case "dc686e60defd00e917f23fcebc994644370f542023cafc8ffee4a32ff01a4cf8":
      return "CasperPunks Mystery Box";
    default:
      return undefined;
  }
};

export const ContractsCall = () => {
  // const date = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const { data, loading, error } = useQuery(ACTIVE_CONTRACTS_BY_DAY_QUERY, {
    variables: {
      date,
    },
  });

  const headers = ["Name", "Contract Hash", "Number of calls", "Total fees"];
  const totalActiveAdress = data?.deploy_stats_combined_view?.length || 0;
  const addresses = data?.deploy_stats_combined_view || [];
  const totalCalls = addresses?.reduce((a: any, b: any) => {
    return a + Number(b["number_of_deploy"]);
  }, 0);

  const rows = addresses.map((item: Data) => {
    return [
      <p>{getName(item.contract_hash) || item.name || "-"}</p>,
      <Link
        key={item.contract_hash}
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-900"
        href={`/contract/${item.contract_hash}?tab=deploys`}
      >
        <span className="md:hidden">
          {truncateString(item.contract_hash, 20)}
        </span>
        <span className="hidden md:block">{item.contract_hash}</span>
      </Link>,
      <p>{item.number_of_deploy}</p>,
      <div>
        <span className="flex items-center space-x-2">
          <span className="text-primary text-md">
            {formatNumber(Number(item.sum_cost_cspr))}
          </span>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
            width="12px"
            alt="cspr"
          />
        </span>
      </div>,
    ];
  });
  return (
    <AppLayout
      title="Scansper | Top active wallet by day / month"
      desc="List of the top active accounts of the Casper Network"
    >
      <Alert text="This feature is new and is in beta test, some errors can appears and data can be incorrect." />

      <div className="flex items-center pb-2 mb-6 space-x-2 border-b">
        <div className="flex items-center space-x-2">
          <p className="text-2xl text-primary">Contract calls made by day</p>

          <input
            type="date"
            className="px-4 py-2 text-base placeholder-gray-400 border rounded-lg w-60 text-primary dark:border-gray-900 background-card focus:outline-none focus:ring-2 focus:ring-indigo-600"
            id="start"
            name="trip-start"
            onChange={e => setDate(e.target.value)}
            value={date}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        {loading && <Loader />}
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
        <div className="sm:col-span-1 md:col-span-2">
          <IconCard
            icon={AiOutlineBarChart}
            value={totalCalls}
            title="Total contracts called"
          />
        </div>
      </div>
      <Card>
        <div className="text-primary">
          <Table
            isLoading={loading}
            showTotalItems
            totalItems={totalActiveAdress}
            rows={rows}
            header={headers}
          />
        </div>
      </Card>
    </AppLayout>
  );
};

export default ContractsCall;
