import React from "react";
import AppLayout from "../../../components/layout/AppLayout";
import Card from "../../../components/shared/Card/Card";
import RichList from "../../../components/shared/RichList/RichList";
import { gql, useQuery } from "@apollo/client";
import { MOTE_VALUE, formatNumber } from "../../../utils/Utils";
import { useGetCasperSupplyInfo } from "../../../hooks/useGetCasperSupplyInfo";
import HomeCard from "../../../components/shared/Card/HomeCard/HomeCard";
import IconCard from "../../../components/shared/Card/IconCard/IconCard";
import { AiOutlineBarChart } from "react-icons/ai";
import Table from "../../../components/shared/Table/Table";
import DistributionChart from "../../../components/shared/Chart/DistributionChart/DistributionChart";
import { Alert } from "../../../components/shared/Alert/Alert";

const ACTIVE_DISTRIBUTION = gql`
  query Test @cached {
    rich1000: rich_list_aggregate(
      where: { total: { _gt: "1000000000000" } }
      order_by: {}
    ) {
      aggregate {
        count
        sum {
          total
        }
      }
    }
    rich10000: rich_list_aggregate(
      where: { total: { _gt: "10000000000000" } }
      order_by: {}
    ) {
      aggregate {
        count
        sum {
          total
        }
      }
    }

    rich50000: rich_list_aggregate(
      where: { total: { _gt: "50000000000000" } }
      order_by: {}
    ) {
      aggregate {
        count
        sum {
          total
        }
      }
    }
    rich100000: rich_list_aggregate(
      where: { total: { _gt: "100000000000000" } }
      order_by: {}
    ) {
      aggregate {
        count
        sum {
          total
        }
      }
    }
    rich250000: rich_list_aggregate(
      where: { total: { _gt: "250000000000000" } }
      order_by: {}
    ) {
      aggregate {
        count
        sum {
          total
        }
      }
    }
    rich500000: rich_list_aggregate(
      where: { total: { _gt: "500000000000000" } }
      order_by: {}
    ) {
      aggregate {
        count
        sum {
          total
        }
      }
    }
    rich1000000: rich_list_aggregate(
      where: { total: { _gt: "1000000000000000" } }
      order_by: {}
    ) {
      aggregate {
        count
        sum {
          total
        }
      }
    }
    rich10Million: rich_list_aggregate(
      where: { total: { _gt: "10000000000000000" } }
      order_by: {}
    ) {
      aggregate {
        count
        sum {
          total
        }
      }
    }
    rich100Million: rich_list_aggregate(
      where: { total: { _gt: "100000000000000000" } }
      order_by: {}
    ) {
      aggregate {
        count
        sum {
          total
        }
      }
    }
  }
`;

export const DistributionPage = () => {
  const { data, loading, error } = useQuery(ACTIVE_DISTRIBUTION, {});
  const querySupply = useGetCasperSupplyInfo();
  const totalSupply = querySupply.data?.data.total || 0;

  const totalHolder = data?.rich1000?.aggregate.count;
  const total10000 = data?.rich10000?.aggregate.count;
  const total50000 = data?.rich50000?.aggregate.count;
  const total100000 = data?.rich100000?.aggregate.count;
  const total250000 = data?.rich250000?.aggregate.count;
  const total500000 = data?.rich500000?.aggregate.count;
  const total1000000 = data?.rich1000000?.aggregate.count;
  const total10000000 = data?.rich10Million?.aggregate.count;
  const total100000000 = data?.rich100Million?.aggregate.count;

  const sumHolder = data?.rich1000?.aggregate.sum.total;
  const sum10000 = data?.rich10000?.aggregate.sum.total;
  const sum50000 = data?.rich50000?.aggregate.sum.total - 300000000;
  const sum100000 = data?.rich100000?.aggregate.sum.total;
  const sum250000 = data?.rich250000?.aggregate.sum.total;
  const sum500000 = data?.rich500000?.aggregate.sum.total;
  const sum1000000 = data?.rich1000000?.aggregate.sum.total;
  const sum10000000 = data?.rich10Million?.aggregate.sum.total;
  const sum100000000 = data?.rich100Million?.aggregate.sum.total;
  console.log(totalSupply);
  const formatCount = (number: number) =>
    Number((Number(Number(number).toFixed(2)) / MOTE_VALUE).toFixed(0));
  const items = [
    {
      color: "#3e9efa",
      label: `Supply own by the top ${total100000000} addresses`,
      value: formatCount(sum100000000),
      percent: (formatCount(sum100000000) * 100) / totalSupply,
    },
    {
      color: "#3e9efa",
      label: `Supply own by the top ${total10000000} addresses`,
      value: formatCount(sum10000000),
      percent: (formatCount(sum10000000) * 100) / totalSupply,
    },
    {
      color: "#3e9efa",
      label: `Supply own by the top ${total100000} addresses`,
      value: formatCount(sum100000),
      percent: (formatCount(sum100000) * 100) / totalSupply,
    },
  ];

  const totalShrimp = totalHolder - total10000 - 102;
  const totalCrab = total10000 - total50000;
  const totalOctopus = total50000 - total100000;
  const totaFish = total100000 - total250000;
  const totaDolphin = total250000 - total500000;
  const totalShark = total500000 - total1000000;

  const totalWhale = total1000000 - total10000000;
  const totalHumpback = total10000000 - total100000000 - 10;

  // SUM
  const sumHumpback = sum10000000 - sum100000000;
  const sumWhale = sum1000000 - sum10000000;
  const sumShark = sum500000 - sum1000000;
  const sumDolphin = sum250000 - sum500000;
  const sumFish = sum100000 - sum250000;
  const sumOctopus = sum50000 - sum100000;
  const sumCrab = sum10000 - sum50000;
  const sumShrimp = sumHolder - sum10000;
  const sumError = totalSupply - sumHolder;

  const headers = ["Category", "Balance", "Count", "Percentage"];
  const itemsAdd = [
    {
      title: "🦐  Shrimp",
      color: "red",
      balance: "0 - 9,999",
      sum: sumShrimp - 112,
      count: totalShrimp,
      percentage: ((totalShrimp * 100) / totalHolder).toFixed(2),
    },
    {
      title: "🦀 Crab",
      color: "red",
      balance: "10,000 - 49,999",
      count: totalCrab,
      sum: sumCrab,
      percentage: ((totalCrab * 100) / totalHolder).toFixed(2),
    },
    {
      title: "🦑 Octopus",
      color: "red",
      balance: "50,000 - 99,999",
      count: totalOctopus,
      sum: sumOctopus,
      percentage: ((totalOctopus * 100) / totalHolder).toFixed(2),
    },
    {
      title: "🐟 Fish",
      color: "red",
      balance: "100,000 - 249,999",
      count: totaFish,
      sum: sumFish,
      percentage: ((totaFish * 100) / totalHolder).toFixed(2),
    },
    {
      title: "🐬 Dolphin",
      color: "red",
      balance: "250,000 - 499,999",
      count: totaDolphin,
      sum: sumDolphin,
      percentage: ((totaDolphin * 100) / totalHolder).toFixed(2),
    },
    {
      title: "🦈 Shark",
      color: "red",
      balance: "500,000 -  999,999",
      count: totalShark,
      sum: sumShark,
      percentage: ((totalShark * 100) / totalHolder).toFixed(2),
    },
    {
      title: "🐳 Whale",
      color: "red",
      balance: "1,000,000 - 9,999,999",
      count: totalWhale,
      sum: sumWhale,
      percentage: ((totalWhale * 100) / totalHolder).toFixed(2),
    },
    {
      title: "🐋 Humpback",
      color: "red",
      balance: "10,000,000 - 99,999,999",
      count: totalHumpback,
      sum: sumHumpback,
      percentage: ((totalHumpback * 100) / totalHolder).toFixed(2),
    },
    {
      title: "🔱 Aquaman",
      color: "red",
      balance: "100,000,000 +",
      count: total100000000,
      sum: sum100000000,
      percentage: ((total100000000 * 100) / totalHolder).toFixed(2),
    },
  ];

  const rows = itemsAdd?.map((item, index) => {
    return [
      <p>{item.title}</p>,
      <p>{item.balance}</p>,
      <p>{formatNumber(item?.count || 0)}</p>,
      <p>{item.percentage}%</p>,
    ];
  });
  return (
    <AppLayout
      title="Scansper | Distribution of the Casper Network tokens"
      desc="Stats and metrics of distribution of $CSPR accross the network"
    >
      <Alert text="This feature is new and is in beta test, some errors can appears and data can be incorrect due to unknow accounts (no public key or account hash)." />
      <div className="grid mb-4 gap-4 sm:grid-cols-1 md:grid-cols-1  xl:grid-cols-4">
        <IconCard
          isAnimate={loading}
          icon={AiOutlineBarChart}
          value={totalHolder - 112 || "Loading..."}
          title="Adresses with > 0 CSPR"
        />

        {items.map((item, index) => {
          return (
            <HomeCard
              key={index}
              color={item.color}
              value={item.value || 0}
              percent={item.percent || 0}
              title={item.label}
            />
          );
        })}
      </div>

      <div className="items-start 2xl:space-x-4 2xl:flex">
        <div className="sm:w-full ">
          <Card titleSize="large" title="Distribution">
            <Table
              totalItems={rows.length || 0}
              isLoading={loading}
              rows={rows}
              header={headers}
            />
          </Card>
        </div>
        {/* <div className="sm:w-full 2xl:w-1/3 lg:block">
          <DistributionChart
            isLoading={loading}
            data={itemsAdd.map(item => {
              return {
                count: Number(item.sum / MOTE_VALUE),
                color: item.color,
                type: item.title,
              };
            })}
          />
        </div> */}
      </div>
    </AppLayout>
  );
};

export default DistributionPage;
