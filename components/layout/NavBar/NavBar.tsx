import React, { useContext, useState } from "react";
import CasperPriceChart from "../../shared/Chart/CasperPriceChart/CasperPriceChart";
import {
  FiHome,
  FiFileText,
  FiCodepen,
  FiServer,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiGithub,
  FiX,
  FiCalendar,
  FiImage,
  FiUserPlus,
} from "react-icons/fi";
import {
  MdTravelExplore,
  MdCompareArrows,
  MdQueryStats,
  MdAttachMoney,
} from "react-icons/md";
import { IoIosApps } from "react-icons/io";
import { IoPodiumOutline } from "react-icons/io5";
import { VscTools, VscSourceControl } from "react-icons/vsc";
import { TbGavel, TbPigMoney, TbApps } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { IconType } from "react-icons/lib";
import classNames from "classnames";
import AppContext from "../../../AppContext";
import Header from "../Header/Header";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";

interface ILink {
  label: string;
  id: string;
  link?: string;
  icon: IconType;
  childrens?: ILink[];
  isSoon?: boolean;
  isNew?: boolean;
}

const NavBar = () => {
  const links: ILink[] = [
    {
      label: "Home",
      link: "/",
      id: "home",
      icon: FiHome,
    },
    {
      label: "Explorer",
      id: "explorer",
      icon: MdTravelExplore,
      childrens: [
        {
          label: "Validators",
          id: "validators",
          link: "/validators",
          icon: TbGavel,
        },
        {
          label: "Contracts",
          id: "contracts",
          link: "/contracts",
          icon: FiFileText,
        },
        {
          label: "Deploys",
          id: "deploys",
          link: "/deploys",
          icon: FiServer,
        },

        {
          label: "Blocks",
          id: "blocks",
          link: "/blocks",
          icon: FiCodepen,
        },
      ],
    },
    {
      label: "Ecosystem",
      id: "ecosystem",
      icon: IoIosApps,
      childrens: [
        {
          label: "Projects",
          id: "projects",
          link: "/ecosystem/projects",
          icon: TbApps,
        },
      ],
    },
    {
      label: "Statistics",
      id: "stats",
      icon: MdQueryStats,
      childrens: [
        {
          label: "Rich list",
          id: "richlist",
          link: "/stats/richlist",
          icon: IoPodiumOutline,
        },

        {
          label: "Genesis accounts list",
          id: "genesis",
          link: "/stats/genesis",
          icon: VscSourceControl,
        },
        {
          label: "Active wallets",
          id: "active-wallets",
          link: "/stats/active-wallets",
          icon: FiCalendar,
        },
        {
          label: "Contracts stats",
          id: "contracts-call",
          link: "/stats/contracts-call",
          icon: FiFileText,
        },
        {
          label: "NFTs stats",
          id: "nft-mint",
          link: "/stats/nfts-mint",
          icon: FiImage,
        },
        {
          label: "Accounts stats",
          id: "account-stats",
          link: "/stats/accounts-stats",
          icon: FiUserPlus,
        },
        {
          label: "Github activity",
          id: "github",
          link: "/stats/github",
          isSoon: true,
          icon: FiGithub,
        },
      ],
    },
    {
      label: "Charts",
      id: "charts",
      isNew: true,
      icon: AiOutlineBarChart,
      childrens: [
        {
          label: "Price",
          id: "chart-price",
          link: "/charts/price",
          icon: MdAttachMoney,
        },
      ],
    },

    {
      label: "Tools",
      id: "tools",
      icon: VscTools,
      childrens: [
        {
          label: "Rewards calculator",
          id: "rewards",
          link: "/tools/rewards",
          icon: TbPigMoney,
        },
        {
          label: "MaketCap comparison",

          id: "marketcap",
          link: "/tools/marketcap-compare",
          icon: MdCompareArrows,
        },
      ],
    },
  ];
  const router = useRouter();
  const isActive = (route: string) => {
    return router.pathname === route;
  };

  const defaultOpenSection =
    links.find(link =>
      link.childrens?.find(child => isActive(child.link || ""))
    )?.id || "";

  const [openLinks, setOpenLinks] = useState<string[]>([defaultOpenSection]);

  const { theme, setTheme } = useTheme();

  const isOpen = (id: string) => {
    return openLinks.includes(id);
  };
  const { isOpenMenu, setIsOpenMenu } = useContext(AppContext);
  const toggleSection = (id: string) => {
    if (openLinks.includes(id)) {
      const newList = [...openLinks].filter(i => i !== id);
      setOpenLinks(newList);
    } else {
      const newList = [...openLinks];
      newList.push(id);
      setOpenLinks(newList);
    }
  };

  const getLinkContent = (link, isChildren) => {
    return (
      <>
        <div
          className={classNames(
            {
              "text-primary background-app": isActive(link.link || ""),
              "text-secondary": !isActive(link.link || ""),
              "pl-12 text-sm": isChildren,
              "pl-6 text-base": !isChildren,
            },
            "flex items-center  justify-between pr-8 hover:background-app"
          )}
        >
          <div>
            <div
              className={classNames(
                {
                  "p-3": isChildren,
                  "p-4": !isChildren,
                },
                "flex items-center justify-start w-full  space-x-4 rounded-md text-md"
              )}
            >
              <span className="text-left">{link.icon({})}</span>
              <span>{link.label}</span>
            </div>
          </div>
          {link.isNew && (
            <p className="p-2 text-xs border rounded-lg text-secondary">
              New !
            </p>
          )}
          {link.childrens ? (
            <FiChevronDown
              className={isOpen(link.id) ? "" : "transform -rotate-90"}
            />
          ) : (
            ""
          )}

          {link.isSoon && (
            <p className="p-2 text-xs border rounded-lg text-secondary">Soon</p>
          )}
        </div>
        {isActive(link.link || "") && (
          <div className="absolute top-0 w-2 h-full bg-red-400 rounded-full -right-1"></div>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col justify-between h-full pb-6 background-card">
      <div style={{ overflow: "overlay" }}>
        <div className={classNames({ hidden: !isOpenMenu })}>
          <Header />
        </div>
        <div className="flex items-center justify-between hidden px-4 pt-6 pb-4 border-b md:block lg:mb-0 lg:pb-0 lg:border-b-0 lg:pt-8">
          <div className="flex items-center space-x-4 lg:mb-8">
            <img src="/cspr.png" width="50" height="50" />
            <span className="text-2xl font-light text-primary">Scansper</span>
          </div>
          <button
            type="button"
            onClick={() => {
              document.body.style.overflow = "auto";
              setIsOpenMenu(false);
            }}
            className={classNames(
              { "lg:hidden": !isOpenMenu },
              "p-2 rounded  hover:bg-gray-200"
            )}
          >
            <FiX className="w-8 h-8" />
          </button>
        </div>
        <div className="hidden px-6 md:block">
          <CasperPriceChart />
        </div>
        <div className="relative mt-4 overflow-hidden">
          <ul className="">
            {links.map(link => {
              return (
                <li key={link.label}>
                  {link.childrens ? (
                    <div
                      onClick={() => toggleSection(link.id)}
                      className="relative cursor-pointer"
                      key={link.link}
                    >
                      {getLinkContent(link, false)}
                    </div>
                  ) : (
                    <Link
                      scroll={link.childrens ? false : true}
                      onClick={() => {
                        setIsOpenMenu(false);
                        document.body.style.overflow = "visible";
                      }}
                      href={link.link || ""}
                      className="relative"
                      key={link.link}
                    >
                      {getLinkContent(link, false)}
                    </Link>
                  )}

                  {isOpen(link.id) && (
                    <ul>
                      {link?.childrens?.map(sublink => {
                        return (
                          <li key={sublink.link}>
                            {sublink.isSoon ? (
                              <div
                                className={classNames(
                                  {
                                    "opacity-50 cursor-not-allowed":
                                      sublink.isSoon,
                                  },
                                  "relative"
                                )}
                                key={sublink.link}
                              >
                                {getLinkContent(sublink, true)}
                              </div>
                            ) : (
                              <Link
                                href={sublink.link || ""}
                                onClick={() => {
                                  setIsOpenMenu(false);
                                  document.body.style.overflow = "visible";
                                }}
                                className={classNames(
                                  {
                                    "opacity-50 cursor-not-allowed":
                                      sublink.isSoon,
                                  },
                                  "relative"
                                )}
                                key={sublink.link}
                              >
                                {getLinkContent(sublink, true)}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex items-center px-10 pt-6">
        <span className="flex items-center space-x-4 text-primary">
          {theme === "dark" ? <FiSun /> : <FiMoon />} <span> Dark mode</span>
        </span>
        <div className="relative inline-block w-10 ml-4 mr-2 align-middle select-none">
          <input
            type="checkbox"
            name="toggle"
            id="Gray"
            onChange={_ => setTheme(theme === "dark" ? "light" : "dark")}
            checked={theme === "dark"}
            className="absolute block w-6 h-6 duration-200 ease-in border-4 rounded-full outline-none appearance-none cursor-pointer background-card checked:bg-gray-500 focus:outline-none right-4 checked:right-0"
          />
          <label
            htmlFor="Gray"
            className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
export default NavBar;
