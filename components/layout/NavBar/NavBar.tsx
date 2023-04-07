import React from "react";
import CasperPriceChart from "../../shared/Chart/CasperPriceChart/CasperPriceChart";
import {
  FiHome,
  FiFileText,
  FiCodepen,
  FiServer,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { TbGavel } from "react-icons/tb";

import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const NavBar = () => {
  const links = [
    {
      label: "Home",
      link: "/",
      icon: FiHome,
    },
    {
      label: "Validators",
      link: "/validators",
      icon: TbGavel,
    },
    {
      label: "Contracts",
      link: "/contracts",
      icon: FiFileText,
    },
    {
      label: "Deploys",
      link: "/deploys",
      icon: FiServer,
    },

    // {
    //   label: "My account",
    //   link: "/account",
    //   icon: FiBriefcase,
    // },

    {
      label: "Blocks",
      link: "/blocks",
      icon: FiCodepen,
    },
  ];

  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const isActive = (route: string) => {
    return router.pathname === route;
  };

  return (
    <nav className="relative hidden h-screen overflow-hidden shadow-lg lg:block lg:w-72 xl:w-80">
      <div className="flex flex-col justify-between h-full pb-6 bg-white dark:bg-gray-700">
        <div>
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
          <div className="mt-4">
            <div>
              {links.map(link => {
                return (
                  <Link href={link.link} className="relative" key={link.link}>
                    <div
                      className={`${
                        isActive(link.link) ? "text-gray-900 bg-bgApp" : ""
                      } px-6 hover:bg-bgApp text-base`}
                    >
                      <div className="flex items-center justify-start w-full p-4 space-x-4 rounded-md text-md">
                        <span className="text-left">{link.icon({})}</span>
                        <span>{link.label}</span>
                      </div>
                    </div>
                    {isActive(link.link) && (
                      <div className="absolute top-0 w-2 h-full bg-red-400 rounded-full -right-1"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center px-10">
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
