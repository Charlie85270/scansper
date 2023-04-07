import { useRouter } from "next/router";
import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";
import { useGetValidator } from "../../hooks/useGetValidator";
import { FiUsers, FiMail, FiPercent, FiTrendingUp } from "react-icons/fi";
import {
  FaFacebook,
  FaGithub,
  FaMedium,
  FaReddit,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { TbWorld } from "react-icons/tb";
import dynamic from "next/dynamic";
import {
  formatNumber,
  getAvatarUrl,
  getPerfColor,
  MOTE_VALUE,
} from "../../utils/Utils";
import { useGetHistoryCasperPrice } from "../../hooks/useGetHistoryCasperPrice";
import { useGetValidatorTotalRewards } from "../../hooks/useGetValidatorTotalRewards";
import { useGetValidatorTotalDelegatorsRewards } from "../../hooks/useGetValidatorTotalDelegatorsRewards";
import Tabs from "../../components/shared/Tabs/Tabs";
import DelegatorsByValidatorsList from "../../components/shared/DelegatorsByValidatorsList/DelegatorsByValidatorsList";
import RewardsByValidatorsList from "../../components/shared/RewardsByValidatorsList/RewardsByValidatorsList";
import BlocksByValidatorsList from "../../components/shared/BlocksByValidatorsList/BlocksByValidatorsList";
import CopyButton from "../../components/shared/CopyButton/CopyButton";
const Valiator = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isFetching, error } = useGetValidator(id);
  const { data: dataTotalRewards } = useGetValidatorTotalRewards(id);
  const { data: dataTotalDelegatorRewards } =
    useGetValidatorTotalDelegatorsRewards(id);
  const price = useGetHistoryCasperPrice(1);
  const casperPrice = price.data?.prices[price.data?.prices.length - 1][1] || 0;

  const tabsTitle = [
    { id: "delegators", title: "Delegators" },
    { id: "rewards", title: "Rewards" },
    { id: "blocks", title: "Block" },
  ];
  const tabsContent = [
    <DelegatorsByValidatorsList />,
    <RewardsByValidatorsList />,
    <BlocksByValidatorsList />,
  ];
  const validator = data?.data;
  const accountInfo = validator?.account_info;
  const percent = Number(
    Number(validator?.average_performance.average_score || 0).toFixed(2)
  );
  const config: ApexCharts.ApexOptions = {
    series: [percent],
    labels: ["performance"],
    colors: [getPerfColor(percent)],
    chart: {
      type: "donut",
      width: 100,
    },

    legend: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            value: {
              fontWeight: "bold",
              offsetY: -10,
              color: getPerfColor(percent),
              fontSize: "12px",
            },
            show: true,
            total: {
              formatter: function (val) {
                return percent + "%";
              },
              label: "",
              show: true,
            },
          },
        },
      },
    },
  };
  return (
    <AppLayout
      title="Casper Network validator"
      desc="Find the best validators to stake you CSPR tokens"
    >
      <div className="">
        <div className="w-full mb-4">
          <Card
            title="Validator details"
            backLabel="Back to validators"
            backLink="/validators"
          >
            <div className="p-2">
              <div className="items-center justify-between md:space-x-8 lg:space-x-16 md:items-start md:flex">
                <div className="w-full md:w-2/6">
                  <div className="flex items-center justify-between px-2 space-x-4 md:justify-between">
                    <div className="flex items-center justify-between space-x-4">
                      <img
                        className="w-32 h-32"
                        src={
                          validator?.account_info?.info.owner.branding.logo
                            .png_1024 ||
                          validator?.account_info?.info.owner.branding.logo
                            .png_256 ||
                          getAvatarUrl(validator?.public_key || "")
                        }
                      />
                      <div>
                        <p className="text-2xl text-gray-800">
                          {accountInfo?.info.owner.name}
                        </p>
                        {accountInfo?.info.owner.location.country && (
                          <div className="flex items-center space-x-2">
                            <img
                              className="w-4 h-4"
                              src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${accountInfo?.info.owner.location.country.toLocaleLowerCase()}.svg`}
                            />
                            <span>
                              {accountInfo?.info.owner.location.country},
                              {accountInfo?.info.owner.location.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-start mt-4 mb-10 ml-4 space-x-6">
                    {validator?.account_info?.info?.owner?.social.facebook && (
                      <a
                        target="_blank"
                        href={`https://facebook.com/${validator?.account_info?.info?.owner?.social.facebook}`}
                      >
                        <FaFacebook className="w-5 h-5 text-blue-800" />
                      </a>
                    )}
                    {validator?.account_info?.info?.owner?.social.github && (
                      <a
                        target="_blank"
                        href={`https://github.com/${validator?.account_info?.info?.owner?.social.github}`}
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                    )}
                    {validator?.account_info?.info?.owner?.social.medium && (
                      <a
                        target="_blank"
                        href={`https://medium.com/${validator?.account_info?.info?.owner?.social.medium}`}
                      >
                        <FaMedium className="w-5 h-5 text-gray-900" />
                      </a>
                    )}
                    {validator?.account_info?.info?.owner?.social.reddit && (
                      <a
                        target="_blank"
                        href={`https://www.reddit.com/user/${validator?.account_info?.info?.owner?.social.reddit}`}
                      >
                        <FaReddit className="w-5 h-5 text-orange-600" />
                      </a>
                    )}

                    {validator?.account_info?.info?.owner?.social.telegram && (
                      <a
                        target="_blank"
                        href={`https://t.me/${validator?.account_info?.info?.owner?.social.telegram}`}
                      >
                        <FaTelegram className="w-5 h-5 text-sky-400" />
                      </a>
                    )}
                    {validator?.account_info?.info?.owner?.social.twitter && (
                      <a
                        target="_blank"
                        href={`https://twitter.com/${validator?.account_info?.info?.owner?.social.twitter}`}
                      >
                        <FaTwitter className="w-5 h-5 text-sky-500" />
                      </a>
                    )}
                    {validator?.account_info?.info?.owner?.social.youtube && (
                      <a
                        target="_blank"
                        href={`https://www.youtube.com/channel/${validator?.account_info?.info?.owner?.social.youtube}`}
                      >
                        <FaYoutube className="w-5 h-5 text-red-600" />
                      </a>
                    )}
                  </div>
                  {/* STATS */}
                  <div className="flex items-center justify-between space-x-3">
                    <div className="flex-col items-center justify-center p-4 space-y-3 text-center border rounded basis-1/3">
                      <FiTrendingUp className="w-5 h-5 mx-auto " />
                      <p className="text-xl font-semibold text-gray-800">
                        {validator?.rank}
                      </p>
                      <p className="text-xs text-gray-500">Rank</p>
                    </div>
                    <div className="flex-col items-center justify-center p-4 space-y-3 text-center border rounded basis-1/3">
                      <FiUsers className="w-5 h-5 mx-auto " />
                      <p className="text-xl font-semibold text-gray-800">
                        {validator?.delegators_number}
                      </p>
                      <p className="text-xs text-gray-500">Delegators</p>
                    </div>
                    <div className="flex-col items-center justify-center p-4 space-y-3 text-center border rounded basis-1/3">
                      <FiPercent className="w-5 h-5 mx-auto " />
                      <p className="text-xl font-semibold text-gray-800">
                        {validator?.fee}
                      </p>
                      <p className="text-xs text-gray-500">Fees</p>
                    </div>
                  </div>
                </div>
                <div className="flex-col w-full md:w-4/6">
                  <div className="py-2 mt-4 border-b md:mt-0">
                    <p className="text-gray-400 text-md">Public key</p>
                    <div className="flex items-center space-x-2 text-lg text-gray-800 truncate">
                      <span>{validator?.public_key}</span>
                      <CopyButton textToCopy={validator?.public_key} />
                    </div>
                  </div>
                  <div className="py-2 border-b">
                    <p className="text-gray-400 text-md">Total stake</p>
                    <span className="flex items-center space-x-2">
                      <span className="text-lg text-gray-800">
                        {formatNumber(
                          Number(
                            Number(
                              Number(validator?.total_stake) / MOTE_VALUE
                            ).toFixed(0)
                          )
                        )}
                      </span>
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
                        width="12px"
                        alt="cspr"
                      />
                      <span className="text-xs text-gray-400">
                        {formatNumber(
                          Number(
                            (
                              (Number(validator?.total_stake) / MOTE_VALUE) *
                              casperPrice
                            ).toFixed(0)
                          )
                        )}
                        $
                      </span>
                    </span>
                  </div>

                  <div className="py-2 border-b">
                    <p className="text-gray-400 text-md">
                      Total delegators rewards
                    </p>
                    <span className="flex items-center space-x-2">
                      <span className="text-lg text-gray-800">
                        {formatNumber(
                          Number(
                            Number(
                              Number(dataTotalDelegatorRewards?.data) /
                                MOTE_VALUE
                            ).toFixed(0)
                          )
                        )}
                      </span>
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
                        width="12px"
                        alt="cspr"
                      />
                      <span className="text-xs text-gray-400">
                        {formatNumber(
                          Number(
                            (
                              (Number(dataTotalDelegatorRewards?.data) /
                                MOTE_VALUE) *
                              casperPrice
                            ).toFixed(0)
                          )
                        )}
                        $
                      </span>
                    </span>
                  </div>

                  <div className="py-2 border-b">
                    <p className="text-gray-400 text-md">
                      Total validators rewards
                    </p>
                    <span className="flex items-center space-x-2">
                      <span className="text-lg text-gray-800">
                        {formatNumber(
                          Number(
                            Number(
                              Number(dataTotalRewards?.data) / MOTE_VALUE
                            ).toFixed(0)
                          )
                        )}
                      </span>
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
                        width="12px"
                        alt="cspr"
                      />
                      <span className="text-xs text-gray-400">
                        {formatNumber(
                          Number(
                            (
                              (Number(dataTotalRewards?.data) / MOTE_VALUE) *
                              casperPrice
                            ).toFixed(0)
                          )
                        )}
                        $
                      </span>
                    </span>
                  </div>
                  <div className="py-2">
                    <p className="text-gray-400 text-md">Performance</p>
                    <div
                      className="flex-col items-start justify-start"
                      id="chart"
                      style={{ width: "100px" }}
                    >
                      <Chart
                        options={config}
                        series={config.series}
                        type="donut"
                        height={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* ABOUT */}
              <div className="mb-6">
                <p className="mt-6 font-semibold text-gray-800">About</p>
                <p className="text-sm text-gray-500">
                  {accountInfo?.info?.nodes[0]?.description ||
                    accountInfo?.info.owner.description ||
                    "No description available"}
                </p>
              </div>
              {/* CONTACT */}
              <div className="flex-col mb-4 mb-6 space-y-2">
                <div className="flex items-center space-x-4">
                  <TbWorld />{" "}
                  <a
                    className="text-md"
                    href={accountInfo?.info.owner.website}
                    target="_blank"
                  >
                    {accountInfo?.info.owner.website || "N/A"}
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <FiMail />
                  <a
                    className="text-md"
                    href={`mailto:${accountInfo?.info.owner.email}`}
                    target="_blank"
                  >
                    {accountInfo?.info.owner.email || "N/A"}
                  </a>
                </div>
              </div>

              <div className="w-full pt-4 mt-4 border-t">
                <Tabs
                  tabsContent={tabsContent}
                  resetUrlOnchange
                  tabs={tabsTitle}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Valiator;
