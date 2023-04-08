import React, { useState } from "react";
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
} from "react-icons/fi";
import { MdTravelExplore, MdCompareArrows, MdQueryStats } from "react-icons/md";
import { IoIosApps } from "react-icons/io";
import { IoPodiumOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import { TbGavel, TbPigMoney, TbApps } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { IconType } from "react-icons/lib";
import classNames from "classnames";

interface ILink {
  label: string;
  id: string;
  link?: string;
  icon: IconType;
  childrens?: ILink[];
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
          label: "Github activity",
          id: "github",
          link: "/stats/github",
          icon: FiGithub,
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
          link: "/tools/marketcap",
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
              "text-gray-900 bg-bgApp": isActive(link.link || ""),
              "pl-12 text-sm": isChildren,
              "pl-6 text-base": !isChildren,
            },
            "flex items-center justify-between pr-8 hover:bg-bgApp"
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
          {link.childrens ? (
            <FiChevronDown
              className={isOpen(link.id) ? "" : "transform -rotate-90"}
            />
          ) : (
            ""
          )}
        </div>
        {isActive(link.link || "") && (
          <div className="absolute top-0 w-2 h-full bg-red-400 rounded-full -right-1"></div>
        )}
      </>
    );
  };

  return (
    <nav className="relative hidden h-screen overflow-hidden border-r lg:block lg:w-72 xl:w-80">
      <div className="flex flex-col justify-between h-full pb-6 bg-white dark:bg-gray-700">
        <div className="overflow-auto">
          <div className="flex items-start justify-start px-6 pt-8">
            <div className="flex mb-12 space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 33 33"
                data-src="/_next/static/media/trusted-icon.3594043f.svg"
              >
                <path
                  id="Trazado_217-1"
                  data-name="Trazado 217"
                  d="M29.217,11.106a3.78,3.78,0,0,0,3.778-3.778V3.778A3.777,3.777,0,0,0,29.217,0H25.662a3.78,3.78,0,0,0-3.778,3.778v5.8a1.367,1.367,0,0,1-1.372,1.367H12.478a1.371,1.371,0,0,1-1.372-1.367v-5.8A3.779,3.779,0,0,0,7.333,0H3.773A3.776,3.776,0,0,0,0,3.778V7.333a3.777,3.777,0,0,0,3.778,3.778h5.8a1.372,1.372,0,0,1,1.372,1.372v8.039A1.371,1.371,0,0,1,9.58,21.894H3.773A3.774,3.774,0,0,0,0,25.667v3.555A3.777,3.777,0,0,0,3.778,33H7.333a3.776,3.776,0,0,0,3.773-3.778v-5.8a1.372,1.372,0,0,1,1.372-1.372h8.039a1.371,1.371,0,0,1,1.372,1.367v5.8a3.776,3.776,0,0,0,3.778,3.778h3.555A3.78,3.78,0,0,0,33,29.217V25.662a3.777,3.777,0,0,0-3.778-3.778h-5.8a1.372,1.372,0,0,1-1.372-1.372V12.478a1.375,1.375,0,0,1,1.094-1.342,1.245,1.245,0,0,1,.274-.03Z"
                  fill="#ff2d2e"
                ></path>
              </svg>
              <span className="text-2xl font-light text-gray-900">
                Casper.scan
              </span>
            </div>
          </div>
          <div className="px-6">
            <CasperPriceChart />
          </div>
          <div className="relative mt-4 overflow-hidden">
            <ul className="">
              {links.map(link => {
                return (
                  <li>
                    {link.childrens ? (
                      <div
                        onClick={
                          link.childrens
                            ? _ => toggleSection(link.id)
                            : () => null
                        }
                        className="relative cursor-pointer"
                        key={link.link}
                      >
                        {getLinkContent(link, false)}
                      </div>
                    ) : (
                      <Link
                        scroll={link.childrens ? false : true}
                        onClick={
                          link.childrens
                            ? _ => toggleSection(link.id)
                            : () => null
                        }
                        href={link.link || ""}
                        className="relative"
                        key={link.link}
                      >
                        {getLinkContent(link, false)}
                      </Link>
                    )}

                    {isOpen(link.id) &&
                      link?.childrens?.map(sublink => {
                        return (
                          <Link
                            href={sublink.link || ""}
                            className="relative"
                            key={sublink.link}
                          >
                            {getLinkContent(sublink, true)}
                          </Link>
                        );
                      })}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex items-center px-10 pt-6">
          <span className="flex items-center space-x-4">
            {theme === "dark" ? <FiSun /> : <FiMoon />} <span> Dark mode</span>
          </span>
          <div className="relative inline-block w-10 ml-4 mr-2 align-middle select-none">
            <input
              type="checkbox"
              name="toggle"
              id="Gray"
              onChange={_ => setTheme(theme === "dark" ? "light" : "dark")}
              checked={theme === "dark"}
              className="absolute block w-6 h-6 duration-200 ease-in bg-white border-4 rounded-full outline-none appearance-none cursor-pointer checked:bg-gray-500 focus:outline-none right-4 checked:right-0"
            />
            <label
              htmlFor="Gray"
              className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
