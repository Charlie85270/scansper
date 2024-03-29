import React, { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import HomeCard from "../components/shared/Card/HomeCard/HomeCard";
import IconCard, {
  IconCardProps,
} from "../components/shared/Card/IconCard/IconCard";
import { GrDeploy } from "react-icons/gr";
import { MdPeopleOutline } from "react-icons/md";
import {
  AiOutlineBarChart,
  AiOutlineClose,
  AiOutlineLineChart,
} from "react-icons/ai";
import { formatNumber, MOTE_VALUE } from "../utils/Utils";
import { FiDatabase, FiHeart } from "react-icons/fi";
import LinearNFTCollection from "../components/shared/NFTCollection/LinearNFTCollection";
import { useGetCasperSupplyInfo } from "../hooks/useGetCasperSupplyInfo";
import { useGetAuctionMetrics } from "../hooks/useGetAuctionMetrics";
import { useGetHistoryCasperPrice } from "../hooks/useGetHistoryCasperPrice";
import { useGetStatusInfos } from "../hooks/useGetStatusInfos";
import SeeMoreBloc from "../components/shared/SeeMoreBloc/SeeMoreBloc";
import { TbGavel } from "react-icons/tb";
import { useGetCoinCommunityData } from "../hooks/useGetCoinCommunityData";
import SentimentCard from "../components/shared/Card/SentimentCard/SentimentCard";
import DeploysList from "../components/shared/DeploysList/DeploysList";
import TodayDeploysStatsChart from "../components/shared/Chart/TodayDeploysStatsChart/TodayDeploysStatsChart";
import Card from "../components/shared/Card/Card";
import { getAccountNumber, getHolderstNumber } from "../services/httpReq";
import Link from "next/link";

export const IndexPage = () => {
  // Queries
  const [intervalMs, setIntervalMs] = React.useState(15000);
  const querySupply = useGetCasperSupplyInfo(intervalMs);
  const queryAuction = useGetAuctionMetrics(intervalMs);
  const price = useGetHistoryCasperPrice(1, intervalMs);
  const statusInfos = useGetStatusInfos(intervalMs);
  const community = useGetCoinCommunityData();
  const [holders, setHolders] = useState(0);
  const [account, setAccounts] = useState(0);
  useEffect(() => {
    getAccountNumber().then(data => {
      if (data?.contentRange) {
        setAccounts(data?.contentRange?.split("/")[1]);
      }
    });
    getHolderstNumber().then(data => {
      if (data?.contentRange) {
        setHolders(data?.contentRange?.split("/")[1]);
      }
    });
  }, []);

  const totalStaked =
    Number(
      Number(Number(queryAuction.data?.total_active_era_stake)).toFixed(0)
    ) / MOTE_VALUE;

  const blockHeight =
    statusInfos.data?.result.last_added_block_info.height || 0;
  const era = statusInfos.data?.result.last_added_block_info.era_id || 0;

  const activeValidators = queryAuction.data?.active_validators_number || 0;
  const totalValidators = queryAuction.data?.active_bids_number || 0;

  const marketCap = price.data?.market_caps[0][1] || 0;
  const lastMarketCap =
    price.data?.market_caps[price.data?.market_caps.length - 1][1] || 0;
  const percentMarketCap = (lastMarketCap / marketCap) * 100 - 100;

  const volumes = price.data?.total_volumes[0][1] || 0;
  const lastVolumes =
    price.data?.total_volumes[price.data?.total_volumes.length - 1][1] || 0;
  const percentVolumes = (lastVolumes / volumes) * 100 - 100;

  const totalColor = "#feba48";
  const circulatingColor = "#4ee6a4";
  const stakedColor = "#3e9efa";
  const totalSupply = querySupply.data?.data.total || 0;
  const circulatingSupply = querySupply.data?.data.circulating || 0;

  const percentCirculatingSupply = (100 * circulatingSupply) / totalSupply;
  const percentStaked = (100 * totalStaked) / totalSupply;

  const sentimentUp = community?.data?.sentiment_votes_up_percentage || 0;
  const sentimentDown = community?.data?.sentiment_votes_down_percentage || 0;
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
      value: formatNumber(Number(lastVolumes.toFixed(0))),
      currency: "$",
      icon: AiOutlineBarChart,
      changes: percentVolumes,
    },
    {
      title: "MarketCap (24h)",
      value: formatNumber(Number(lastMarketCap.toFixed(0))),
      currency: "$",
      icon: AiOutlineLineChart,
      changes: percentMarketCap,
    },
    {
      title: "Holders",
      value: formatNumber(holders),
      description: `${formatNumber(account)} accounts`,
      currency: "",
      icon: MdPeopleOutline,
    },
    {
      title: "Block height",
      isAnimate: true,
      value: formatNumber(blockHeight),
      currency: "",
      icon: FiDatabase,
      description: `ERA : ${era}`,
    },
    {
      title: "Active validators",
      value: activeValidators,
      currency: "",
      icon: TbGavel,
      description: `${totalValidators} actives bids`,
    },
  ];

  return (
    <AppLayout
      title="Scansper | Casper Network explorer $CSPR"
      desc="Scansper is a Casper Network explorer where you can follow the network usages, NFT, analytics and last projects launched on Casper Network"
    >
      <div className="relative flex flex-col items-center justify-between w-full mb-5 rounded shadow-lg md:h-20 md:pr-6 md:py-0 md:flex-row">
        <img
          src="/ipwe-banner.jpg"
          className="absolute w-full h-full rounded-lg z-1"
        />
        <div className="flex items-center justify-between px-6 pt-4 my-2 md:pt-0 w-54 md:w-72">
          <div className="z-10 flex justify-between w-72 item-center">
            <img src="ipwe.svg" className="w-14" />
            <AiOutlineClose className="w-6 h-full pt-2 text-white" />
            <img src="casperlabs.svg" className="w-20" />
          </div>
        </div>
        <p className="z-10 flex items-center my-6 font-mono text-sm text-center text-white md:text-xl">
          Follow the largest enterprise blockchain NFT deployment in history
        </p>
        <Link
          href="/ipwe?tab=deploys"
          type="button"
          className="z-10 flex items-center h-10 px-4 py-2 mb-4 text-base font-medium text-black bg-white border rounded md:mb-0 w-28 hover:bg-gray-100"
        >
          <GrDeploy className="mr-2 " />
          Follow
        </Link>
      </div>

      {/* Blockchain DATA */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
        {options.map(option => {
          return (
            <div className="sm:col-span-1 md:col-span-2">
              <IconCard
                currency={option.currency}
                changes={option.changes}
                isAnimate={option.isAnimate}
                icon={option.icon}
                value={option.value}
                title={option.title}
                description={option.description || ""}
              />
            </div>
          );
        })}
        <div className="sm:col-span-1 md:col-span-2">
          <SentimentCard
            icon={FiHeart}
            title="Community Sentiment"
            down={sentimentDown}
            up={sentimentUp}
          />
        </div>

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

      {/* NFT COLLECTION */}

      <SeeMoreBloc
        href="https://www.friendly.market/"
        title="Trending NFT Collections"
      >
        <LinearNFTCollection />
      </SeeMoreBloc>
      <div className="items-start 2xl:space-x-4 2xl:flex">
        <div className="sm:w-full 2xl:w-5/6">
          <SeeMoreBloc href="/deploys" title="Latest deploys">
            <Card>
              <DeploysList />
            </Card>
          </SeeMoreBloc>
        </div>
        <div className="mt-6 2xl:mt-24 sm:w-full 2xl:w-1/4 lg:block">
          <TodayDeploysStatsChart />
        </div>
      </div>
    </AppLayout>
  );
};

export default IndexPage;
