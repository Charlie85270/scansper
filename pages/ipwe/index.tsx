import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";
import { useGetContractPackage } from "../../hooks/useGetContractPackage";
import { useGetStatusInfos } from "../../hooks/useGetStatusInfos";
import { useGetItemFromHashAccount } from "../../hooks/useGetItemFromHashAccount";
import DeploysList from "../../components/shared/DeploysList/DeploysList";
import Tabs from "../../components/shared/Tabs/Tabs";
import IconCard, {
  IconCardProps,
} from "../../components/shared/Card/IconCard/IconCard";
import { formatNumber } from "../../utils/Utils";
import { gql, useQuery } from "@apollo/client";
import { BiGasPump, BiImage } from "react-icons/bi";
import { useGetHistoryCasperPrice } from "../../hooks/useGetHistoryCasperPrice";
import { getTypeContract } from "../../components/shared/ContractsList/ContractsList";
import { GrDocumentText } from "react-icons/gr";
import dynamic from "next/dynamic";
import { Alert } from "../../components/shared/Alert/Alert";
import SeeMoreBloc from "../../components/shared/SeeMoreBloc/SeeMoreBloc";
import { useTheme } from "next-themes";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const IPWE_PACKAGE =
  "221048e279982e9dc17f69d558cc97feb658c56576cf1006ab6f870e7d22f129";

const IPWE_CONTRACT =
  "3e55becbd6d7e7f0336dbf65c0b207e42d95f1453164b39c649cab0115c4438a";

const NFT_MINTED = gql`
  query GetNFTminted {
    deploys_aggregate(
      where: {
        contract_hash: {
          _eq: "3e55becbd6d7e7f0336dbf65c0b207e42d95f1453164b39c649cab0115c4438a"
        }
        entrypoint: { _eq: "mint_one" }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const TOTAL_FEES = gql`
  query GetNFTminted {
    deploy_stats_combined_view(
      where: {
        contrat_package: {
          _eq: "221048e279982e9dc17f69d558cc97feb658c56576cf1006ab6f870e7d22f129"
        }
      }
      order_by: { date: asc }
    ) {
      sum_cost_cspr
      number_of_deploy
      date
    }
  }
`;

export const IpwePage = () => {
  const { theme } = useTheme();
  const { data: NFTCount } = useQuery(NFT_MINTED);
  const { data: dataFees } = useQuery(TOTAL_FEES);
  const price = useGetHistoryCasperPrice(1);
  const casperPrice = price.data?.prices[price.data?.prices.length - 1][1] || 0;
  const nftCount = NFTCount?.deploys_aggregate?.aggregate?.count || 0;
  const totalFees = (dataFees?.deploy_stats_combined_view || []).reduce(
    (a: any, b: any) => {
      return a + Number(b["sum_cost_cspr"]);
    },
    0
  );
  const dataDeployDetails = dataFees?.deploy_stats_combined_view || [];
  const contractQuery = useGetContractPackage(IPWE_PACKAGE);
  const statusInfos = useGetStatusInfos();
  const stateRootHash =
    statusInfos.data?.result.last_added_block_info.state_root_hash;
  const rawData = useGetItemFromHashAccount(
    stateRootHash,
    `hash-${IPWE_PACKAGE}`
  );
  const { data } = contractQuery;
  const tabsTitle = [{ id: "deploys", title: "Deploys" }];
  const tabsContent = [<DeploysList contractPackage={IPWE_PACKAGE} />];

  const options: IconCardProps[] = [
    {
      title: "Total patents minted",
      value: formatNumber(nftCount),
      icon: BiImage,
      description: "/ 25 000 000",
    },
    {
      title: "Total gas used",
      value: formatNumber(totalFees),
      currency: (
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
          width="12px"
          alt="cspr"
        />
      ),
      description: `${formatNumber(totalFees * casperPrice)}$`,
      icon: BiGasPump,
    },
    {
      title: "Contract type",
      value: getTypeContract(data?.contract_type_id),
      icon: GrDocumentText,
    },
    {
      title: "Deployment Date",
      value: new Date(data?.timestamp.toString() || "").toLocaleDateString(),
      icon: GrDocumentText,
    },
  ];

  const config: ApexCharts.ApexOptions = {
    series: [
      {
        name: "patents minted",
        type: "column",
        data: dataDeployDetails?.map(data => data.number_of_deploy),
      },
    ],
    chart: {
      height: 350,
      type: "line",

      stacked: false,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: [1, 4],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: "50%",
      },
    },
    responsive: [
      {
        breakpoint: 767,
        options: {
          stroke: {
            width: [4, 1, 1, 1, 3],
            curve: "smooth",
          },
          legend: {
            fontSize: "14px",
            offsetY: 20,
            itemMargin: {
              vertical: 10,
              horizontal: 10,
            },
          },
        },
      },
    ],
    fill: {
      opacity: [1, 1, 1, 1, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: dataDeployDetails?.map(data => data.date),
    markers: {
      size: 0,
    },
    legend: {
      fontSize: "16px",
      offsetY: 20,
      itemMargin: {
        vertical: 20,
        horizontal: 20,
      },
    },
    grid: {
      borderColor: theme === "dark" ? "#111827" : "#f3f4f6",
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: theme === "dark" ? "#f3f4f6" : "#111827",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === "dark" ? "#f3f4f6" : "#111827",
        },
      },
      title: {
        style: {
          color: theme === "dark" ? "#f3f4f6" : "#111827",
        },
        text: "Patents minted",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " patents minted";
          }
          return y;
        },
      },
    },
  };

  return (
    <AppLayout
      title="Scansper | Ipwe"
      desc=" Follow the largest enterprise blockchain NFT deployment in history"
    >
      <Alert text="REAL MINT HASN'T STARTED ! Currents stats are for the test contract (CEP-47) of ipwe. The real contract will use the CEP-78 1.2 standard. This page will be automatically updated when mint will start." />
      <div className="gap-4 mb-4 md:grid sm:grid-cols-2 md:grid-cols-8 xl:grid-cols-12">
        <div className="block col-span-8 mb-4 md:mb-0 md:col-span-4 md:row-span-4 xl:hidden">
          <img src="/ipwe.png" className="w-full h-full rounded-lg shadow-lg" />
        </div>
        {options.map(option => {
          return (
            <div
              key={option.value}
              className="mb-4 sm:col-span-1 md:col-span-8 lg:col-span-4 xl:col-span-2 md:mb-0"
            >
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

        <div className="hidden sm:col-span-3 md:col-span-4 lg:row-span-3 xl:block">
          <img src="/ipwe.png" className="h-full rounded-lg shadow-lg" />
        </div>
        <div className="col-span-12 lg:col-span-8 lg:row-span-2">
          <Card title={`Mint timeline`}>
            <Chart
              options={config}
              series={config.series}
              type="line"
              height={300}
            />
          </Card>
        </div>
      </div>
      <Card title="Contract package details">
        <div className="px-2">
          <div className="flex-col w-full">
            <div className="py-2 mt-4 border-b md:mt-0">
              <p className="text-secondary text-md">Contract hash</p>
              <p className="text-lg truncate text-primary">{IPWE_CONTRACT}</p>
            </div>
            <div className="py-2 mt-4 border-b md:mt-0">
              <p className="text-secondary text-md">Contract package hash</p>
              <p className="text-lg truncate text-primary">
                {data?.contract_package_hash}
              </p>
            </div>
            <div className="py-2 mt-4 border-b md:mt-0">
              <p className="text-secondary text-md">Name</p>

              {data?.contract_name}
            </div>
            <div className="py-2 mt-4 border-b md:mt-0">
              <p className="text-secondary text-md">Contract type</p>

              {getTypeContract(data?.contract_type_id)}
            </div>
            <div className="py-2 mt-4 border-b md:mt-0">
              <p className="text-secondary text-md">Description</p>
              {data?.contract_description}
            </div>
          </div>
          <div className="my-4">
            <p className="pb-4">Raw data</p>
            <DynamicReactJson src={{ json: rawData.data }} />
          </div>
        </div>
      </Card>
      <div className="mt-4">
        <Card title="Deploys details">
          <Tabs tabsContent={tabsContent} resetUrlOnchange tabs={tabsTitle} />
        </Card>
      </div>
    </AppLayout>
  );
};

export default IpwePage;
