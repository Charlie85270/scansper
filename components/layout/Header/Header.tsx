import React, { useState } from "react";

const Header = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <header className="fixed relative top-0 z-50 flex-none w-full h-24 px-4 mx-auto text-sm text-gray-700 bg-white border-b dark:bg-gray-800 lg:px-0">
      <div className="flex items-center h-full py-4 space-x-2">
        <div className="flex flex-wrap items-center justify-start ml-6 dark:text-white md:justify-between">
          <div className="relative flex items-center w-full h-full lg:w-96 group">
            <div className="absolute z-50 flex items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
              <svg
                fill="none"
                className="relative w-5 h-5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <svg
              className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
              xmlns="http://www.w3.org/2000/svg"
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
          } w-24 h-10 px-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          Search
        </button>
      </div>
    </header>
  );
};
export default Header;
