import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import AppContext from "../../../AppContext";
import { ClickTopBar } from "@make-software/csprclick-ui";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const { isOpenMenu, setIsOpenMenu } = useContext(AppContext);

  const launchSearch = e => {
    e.preventDefault();

    router.push(
      "search",
      { query: { search: searchText }, pathname: "/search" },
      {
        shallow: true,
      }
    );
  };

  return (
    <header className="fixed relative top-0 z-50 flex-none w-full h-40 px-4 mx-auto text-sm text-gray-700 border-b dark:border-gray-900 background-card lg:h-24 lg:px-0">
      <div className="relative flex items-center justify-between h-24">
        <div
          className="flex items-center space-x-4 lg:hidden"
          onClick={() => router.push("/")}
        >
          <img src="/cspr.png" width="50" height="50" />
        </div>
        <div className="flex flex-col items-center justify-center lg:hidden">
          <p className="text-xl text-primary">Scansper</p>
          <p className="text-sm text-secondary">Casper Network explorer</p>
        </div>

        <div className="absolute flex items-center w-full h-12 py-4 space-x-2 -bottom-10 lg:bottom-0 lg:w-1/4 lg:relative">
          <form
            onSubmit={launchSearch}
            className="flex items-center justify-start w-full lg:ml-6 dark:text-white lg:justify-between "
          >
            <div className="relative flex items-center w-full h-full lg:w-96 group">
              <svg
                className="absolute left-0 z-20 w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-secondary"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
              <input
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                type="text"
                className="block w-full h-12 py-1.5 pl-10 pr-4 leading-normal rounded-md focus:border-transparent focus:outline-none ring-opacity-90 bg-gray-100 dark:bg-gray-900 text-secondary aa-input"
                placeholder="Search"
              />
            </div>
            <button
              type="submit"
              disabled={!searchText}
              className={`${
                !searchText ? "opacity-50" : ""
              } w-12 h-12 px-4 text-base ml-2 font-semibold text-center text-white transition duration-200 ease-in bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <span>
                <svg
                  className="left-0 z-20 w-4 h-4 text-white pointer-events-none fill-current group-hover:text-secondary"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                </svg>
              </span>
            </button>
          </form>
        </div>
        <div className="items-center lg:flex">
          <ClickTopBar />
        </div>
        <button
          type="button"
          onClick={() => {
            document.body.style.overflow = isOpenMenu ? "auto" : "hidden";
            setIsOpenMenu(!isOpenMenu);
          }}
          className="p-2 border rounded text-primary dark:border-gray-100"
        >
          {isOpenMenu ? (
            <FiX className="w-8 h-8" />
          ) : (
            <FiMenu className="w-8 h-8" />
          )}
        </button>
      </div>
    </header>
  );
};
export default Header;
