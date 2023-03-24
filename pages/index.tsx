import React from "react";
import AppLayout from "../components/layout/AppLayout";
import HomeCard from "../components/shared/Card/HomeCard/HomeCard";
import IconCard, {
  IconCardProps,
} from "../components/shared/Card/IconCard/IconCard";
import { AiOutlineBarChart, AiOutlineLineChart } from "react-icons/ai";
import { formatNumber, MOTE_VALUE } from "../utils/Utils";
import { FiDatabase, FiPercent, FiCheckSquare } from "react-icons/fi";
import LinearNFTCollection from "../components/shared/NFTCollection/LinearNFTCollection";
import { useGetCasperSupplyInfo } from "../hooks/useGetCasperSupplyInfo";
import { useGetAuctionMetrics } from "../hooks/useGetAuctionMetrics";
import { useGetHistoryCasperPrice } from "../hooks/useGetHistoryCasperPrice";
import { useGetStatusInfos } from "../hooks/useGetStatusInfos";
import Link from "next/link";
import LinkButton from "../components/shared/Link/LinkButton";

export const IndexPage = () => {
  // Queries
  const querySupply = useGetCasperSupplyInfo();
  const queryAuction = useGetAuctionMetrics();
  const price = useGetHistoryCasperPrice(1);
  const statusInfos = useGetStatusInfos();

  const totalStaked =
    Number(Number(queryAuction.data?.total_active_era_stake || 0).toFixed(0)) /
    MOTE_VALUE;

  const blockHeight =
    statusInfos.data?.result.last_added_block_info.height || 0;
  const era = statusInfos.data?.result.last_added_block_info.era_id || 0;

  const activeValidators = queryAuction.data?.active_validators_number || 0;
  const totalValidators = queryAuction.data?.active_bids_number || 0;

  const marketCap = price.data?.market_caps[0][1] || 0;
  const lastMarketCap =
    price.data?.market_caps[price.data?.market_caps.length - 1][1] || 0;
  const percentMarketCap = (lastMarketCap / marketCap) * 100 - 100;

  const totalColor = "#feba48";
  const circulatingColor = "#4ee6a4";
  const stakedColor = "#3e9efa";
  const totalSupply = querySupply.data?.data.total || 0;
  const circulatingSupply = querySupply.data?.data.circulating || 0;

  const percentCirculatingSupply = (100 * circulatingSupply) / totalSupply;
  const percentStaked = (100 * totalStaked) / totalSupply;
  const items = [
    {
      color: totalColor,
      label: "Total supply",
      value: totalSupply,
      percent: 100,
    },
    {
      color: circulatingColor,
      label: "Circulating supply",
      value: circulatingSupply,
      percent: percentCirculatingSupply,
    },
    {
      color: stakedColor,
      label: "Staked supply",
      value: Number(totalStaked.toFixed()),
      percent: percentStaked,
    },
  ];

  const options: IconCardProps[] = [
    {
      title: "Volume (24h)",
      value: formatNumber(9498584),
      currency: "$",
      icon: AiOutlineBarChart,
      changes: -0.99,
    },
    {
      title: "MarketCap (24h)",
      value: formatNumber(Number(marketCap.toFixed(0))),
      currency: "$",
      icon: AiOutlineLineChart,
      changes: percentMarketCap,
    },
    {
      title: "APY",
      value: 10.54,
      currency: "%",
      icon: FiPercent,
    },
    {
      title: "Block height",
      value: formatNumber(blockHeight),
      currency: "",
      icon: FiDatabase,
      description: `ERA : ${era}`,
    },
    {
      title: "Active validators",
      value: activeValidators,
      currency: "",
      icon: FiCheckSquare,
      description: `${totalValidators} actives bids`,
    },
  ];

  return (
    <AppLayout
      title="casper.explrorer is an explorer for the Casper Network blockchain"
      desc="Retrieve data, follow the network usages and much more"
    >
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
        {options.map(option => {
          return (
            <div className="sm:col-span-1 md:col-span-2">
              <IconCard
                currency={option.currency}
                changes={option.changes}
                icon={option.icon}
                value={option.value}
                title={option.title}
                description={option.description || ""}
              />
            </div>
          );
        })}
        {items.map(item => {
          return (
            <div className="sm:col-span-3 lg:col-span-4">
              <HomeCard
                key={item.label}
                color={item.color}
                value={item.value}
                percent={item.percent}
                title={item.label}
              />
            </div>
          );
        })}
      </div>

      <div className="">
        <div className="flex items-center justify-between w-full py-8">
          <p className="w-1/2 text-2xl text-gray-800">
            Trending NFT Collections
          </p>
          <LinkButton
            title="See all"
            href="https://www.friendly.market/"
            target="_blank"
          ></LinkButton>
        </div>
        <LinearNFTCollection />
      </div>
    </AppLayout>
  );
};

export default IndexPage;
