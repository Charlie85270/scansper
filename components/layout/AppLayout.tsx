import Meta from "../shared/Meta";
import Header from "./Header/Header";
import React, { useContext, useEffect, useState } from "react";

import Footer from "./Footer/Footer";
import AppContext from "../../AppContext";
import classNames from "classnames";
import NavBar from "./NavBar/NavBar";
import dynamic from "next/dynamic";
import { CsprClickInitOptions } from "@make-software/csprclick-core-client";
import { ThemeProvider } from "styled-components";
import { useTheme } from "next-themes";
const ClickProvider = dynamic(
  () =>
    import("@make-software/csprclick-ui").then(mod => {
      return mod.ClickProvider;
    }),
  {
    ssr: false,
  }
);

const clickOptions: CsprClickInitOptions = {
  appName: "CSPR.playground",
  contentMode: "iframe",
  providers: [
    "casper-wallet",
    "ledger",
    "casperdash",
    "metamask-snap",
    "torus-wallet",
    "casper-signer",
  ],
  appId: "csprclick-template",
};
interface Props {
  title: string;
  desc: string;
  children: React.ReactNode;
}

const AppLayout = ({ title, desc, children }: Props) => {
  const [isLoading, setIsloading] = useState(true);
  const [cpsrTheme, setCsprTheme] = useState();
  const { isOpenMenu } = useContext(AppContext);
  const { theme } = useTheme();

  useEffect(() => {
    import("@make-software/csprclick-ui")
      .then(mod => {
        const themeC =
          theme === "light"
            ? mod.CsprClickThemes.light
            : mod.CsprClickThemes.dark;
        setCsprTheme({
          ...themeC,
          typography: {
            ...mod.CsprClickThemes.typography,
            fontWeight: {
              bold: 700,
              extraBold: 800,
              light: 300,
              medium: 500,
              regular: 400,
              semiBold: 600,
            },
            fontFamily: {
              primary:
                'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important',
              mono: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important',
            },
          },
          styleguideColors: {
            ...themeC.styleguideColors,
            backgroundTertiary: theme === "light" ? "white" : "#1f2937",
            contentTertiary: theme === "light" ? "black" : "white",
            contentOnFill: theme === "light" ? "gray" : "gray",
          },
        });
      })
      .finally(() => {
        setIsloading(false);
      }),
      {
        ssr: false,
      };
  }, [theme]);
  if (isLoading || !cpsrTheme) {
    return (
      <div className="flex w-full items-center justify-center mt-44">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <ClickProvider options={clickOptions}>
      <ThemeProvider theme={cpsrTheme}>
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
                  "w-full p-4 lg:pl-72 xl:pl-80 ml-4 min-h-screen pt-24 mx-auto mt-24 lg:mt-4"
                )}
              >
                {children}
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
      </ThemeProvider>
    </ClickProvider>
  );
};

export default AppLayout;
