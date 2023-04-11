import React, { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import AppContext from "../../../AppContext";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const { setIsOpenMenu } = useContext(AppContext);
  return (
    <header className="fixed relative top-0 z-50 flex-none w-full h-24 px-4 mx-auto text-sm text-gray-700 bg-white border-b dark:bg-gray-800 lg:px-0">
      <div className="flex items-center justify-between h-24">
        <div className="flex space-x-4 lg:hidden">
          <img src="/cspr.png" width="55" height="55" />
        </div>
        <div className="flex items-center h-full py-4 space-x-2">
          <div className="flex flex-wrap items-center justify-start ml-6 dark:text-white md:justify-between">
            <div className="relative flex items-center w-full h-full lg:w-96 group">
              <svg
                className="absolute left-0 z-20 w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
              <input
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                type="text"
                className="block w-full h-12 py-1.5 pl-10 pr-4 leading-normal rounded-md focus:border-transparent focus:outline-none ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
                placeholder="Search"
              />
            </div>
          </div>
          <button
            type="button"
            disabled={!searchText}
            className={`${
              !searchText ? "opacity-50" : ""
            } w-12 h-12 px-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            <span>
              {" "}
              <svg
                className="left-0 z-20 w-4 h-4 text-white pointer-events-none fill-current group-hover:text-gray-400"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
            </span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsOpenMenu(true);
            document.body.style.overflow = "hidden";
          }}
          className="p-2 rounded hover:bg-gray-200"
        >
          <FiMenu className="w-8 h-8" />
        </button>
      </div>
    </header>
  );
};
export default Header;
