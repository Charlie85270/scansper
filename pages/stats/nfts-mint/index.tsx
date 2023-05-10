import Link from "next/link";
import React, { useContext, useState } from "react";
import AppContext from "../../../AppContext";
import AppLayout from "../../../components/layout/AppLayout";
import Card from "../../../components/shared/Card/Card";
import RichList from "../../../components/shared/RichList/RichList";
import Table from "../../../components/shared/Table/Table";
import {
  formatNumber,
  getAvatarUrl,
  getPublicKeyName,
  truncateString,
} from "../../../utils/Utils";
import { gql, useQuery } from "@apollo/client";
import IconCard from "../../../components/shared/Card/IconCard/IconCard";
import { AiOutlineBarChart } from "react-icons/ai";
import Loader from "../../../components/shared/Loader/Loader";

const ACTIVE_CONTRACTS_BY_DAY_QUERY = gql`
  query GetNFTmintedByDay($date: date) {
    minted_tokens_per_contract_day(
      order_by: { count_minted: desc }
      where: { m_day: { _eq: $date } }
    ) {
      contract_hash
      count_minted
      name
      m_day
    }
  }
`;

interface Data {
  count_minted: number;
  contract_hash: string;
  name: string;
}

export const NFTsMint = () => {
  // const date = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const { data, loading, error } = useQuery(ACTIVE_CONTRACTS_BY_DAY_QUERY, {
    variables: {
      date,
    },
  });

  const headers = ["Name", "Contract Hash", "NFT minted"];
  const totalActiveAdress = data?.minted_tokens_per_contract_day?.length || 0;
  const addresses = data?.minted_tokens_per_contract_day || [];
  const totalCalls = addresses?.reduce((a: any, b: any) => {
    return a + Number(b["count_minted"]);
  }, 0);

  const auction =
    "ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea";

  const rows = addresses.map((item: Data) => {
    return [
      <p>
        {auction === item.contract_hash
          ? "Auction (Delegate / Undelegate)"
          : item.name || "-"}
      </p>,
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
      <p>{item.count_minted}</p>,
    ];
  });
  return (
    <AppLayout
      title="Scansper | NFT minted by day / contracts"
      desc="List of the NFT minted by day of the Casper Network"
    >
      <div className="flex items-center mb-6 space-x-4">
        <div className="flex items-center space-x-2">
          <label className="text-primary">Select date:</label>
          <input
            type="date"
            className="px-4 py-2 text-base placeholder-gray-400 border rounded-lg text-primary dark:border-gray-900 background-card focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
            title="Total NFT minted"
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

export default NFTsMint;
