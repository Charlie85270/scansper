import React, { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import AppContext from "../../../AppContext";
import NavBar from "../NavBar/NavBar";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const { isOpenMenu, setIsOpenMenu } = useContext(AppContext);
  return (
    <header className="fixed relative top-0 z-50 flex-none w-full h-24 px-4 mx-auto text-sm text-gray-700 bg-white border-b dark:bg-gray-800 lg:px-0">
      <div className="flex items-center justify-between h-24">
        <div className="flex space-x-4 lg:hidden">
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
            } w-24 h-10 px-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            Search
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
