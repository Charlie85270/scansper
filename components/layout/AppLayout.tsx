import Meta from "../shared/Meta";
import Header from "./Header/Header";
import React, { useContext, useEffect, useState } from "react";

import Footer from "./Footer/Footer";
import AppContext from "../../AppContext";
import classNames from "classnames";
import NavBar from "./NavBar/NavBar";

import { useTheme } from "next-themes";

interface Props {
  title: string;
  desc: string;
  children: React.ReactNode;
}

const AppLayout = ({ title, desc, children }: Props) => {
  const { isOpenMenu } = useContext(AppContext);
  const { theme } = useTheme();

  return (
    <div className="flex flex-col font-sans antialiased text-gray-600 bg-gray-100 dark:bg-gray-900">
      <Meta pageTitle={title} description={desc} />
      <div className="flex">
        <div className="fixed top-0">
          <nav className="relative hidden h-screen overflow-hidden border-r dark:border-gray-900 lg:block lg:w-72 xl:w-80">
            <NavBar />
          </nav>
        </div>

        <div className="w-full ">
          <div className="fixed lg:pl-72 xl:pl-80 top-0 z-50 w-full">
            <Header />
          </div>
          <main
            className={classNames(
              {
                "": isOpenMenu,
                "overflow-x-hidden overflow-y-auto": !isOpenMenu,
              },
              "w-full p-4 lg:pl-72 xl:pl-80  min-h-screen pt-24 mx-auto mt-24 lg:mt-4"
            )}
          >
            <div className="lg:pl-4">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
      {isOpenMenu && (
        <nav className="fixed top-0 z-50 w-full h-screen overflow-hidden border-r dark:border-gray-900">
          <NavBar />
        </nav>
      )}
    </div>
  );
};

export default AppLayout;
