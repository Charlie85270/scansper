import Link from "next/link";
import React, { useContext, useState } from "react";
import AppContext from "../../../AppContext";
import AppLayout from "../../../components/layout/AppLayout";
import Card from "../../../components/shared/Card/Card";
import RichList from "../../../components/shared/RichList/RichList";
import Table from "../../../components/shared/Table/Table";
import {
  getAvatarUrl,
  getPublicKeyName,
  truncateString,
} from "../../../utils/Utils";
import { gql, useQuery } from "@apollo/client";
import IconCard from "../../../components/shared/Card/IconCard/IconCard";
import { AiOutlineBarChart } from "react-icons/ai";
import Loader from "../../../components/shared/Loader/Loader";

const ACTIVE_WALLETS_BY_DAY_QUERY = gql`
  query GetActiveWalletsByDay($date: date) {
    v_mat_active_addresses_detailed(
      order_by: { number_of_deploy_requested: desc }
      where: { date: { _eq: $date } }
    ) {
      public_key
      number_of_deploy_requested
    }
  }
`;

interface Data {
  number_of_deploy_requested: number;
  public_key: string;
}

export const ActiveWallet = () => {
  // const date = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { validators } = useContext(AppContext);
  const { data, loading, error } = useQuery(ACTIVE_WALLETS_BY_DAY_QUERY, {
    variables: {
      date,
    },
  });

  const headers = ["Public Key", "Number of deploys"];
  const totalActiveAdress = data?.v_mat_active_addresses_detailed?.length || 0;
  const addresses = data?.v_mat_active_addresses_detailed || [];
  const totalDeploys = addresses?.reduce((a: any, b: any) => {
    return a + Number(b["number_of_deploy_requested"]);
  }, 0);

  const rows = addresses.map((item: Data) => {
    return [
      <Link
        key={item.public_key}
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-900"
        href={`/account/${item.public_key}?tab=deploys`}
      >
        <img
          className="w-6 h-6 rounded-lg"
          src={getAvatarUrl(item.public_key, validators)}
        />
        <span className="md:hidden">
          {truncateString(getPublicKeyName(item.public_key, validators), 20)}
        </span>
        <span className="hidden md:block">
          {getPublicKeyName(item.public_key, validators)}
        </span>
      </Link>,
      <p>{item.number_of_deploy_requested}</p>,
    ];
  });
  return (
    <AppLayout
      title="Scansper | Top active wallet by day / month"
      desc="List of the top active accounts of the Casper Network"
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
            value={totalActiveAdress}
            title="Total actives wallets"
          />
        </div>
        <div className="sm:col-span-1 md:col-span-2">
          <IconCard
            currency="deploys"
            icon={AiOutlineBarChart}
            value={addresses[0]?.number_of_deploy_requested || "0"}
            title="Most active wallet"
          />
        </div>
        <div className="sm:col-span-1 md:col-span-2">
          <IconCard
            currency="deploys"
            icon={AiOutlineBarChart}
            value={totalDeploys}
            title="Total successful deploys"
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

export default ActiveWallet;
