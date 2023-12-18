import { FC, useEffect, useState } from "react";
import { AppProps } from "next/app";
import "../global.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ThemeProvider } from "next-themes";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloClient";
import AppContext from "../AppContext";
import { useGetAllValidators } from "../hooks/useGetAllValidators";
import { useGetStatusInfos } from "../hooks/useGetStatusInfos";
import { getAvatarUrl } from "../utils/Utils";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import { CsprClickInitOptions } from "@make-software/csprclick-core-client";
import dynamic from "next/dynamic";
import { ThemeProvider as ThemeProviderStyled } from "styled-components";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

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
  appName: "Scansper",
  contentMode: "iframe",
  providers: [
    "casper-wallet",
    "ledger",
    "casperdash",
    "metamask-snap",
    "torus-wallet",
    "casper-signer",
  ],
  appId: "scansper",
};

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(true);
  const [cpsrTheme, setCsprTheme] = useState();
  const theme = "light";
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
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
    <div id="root">
      <ClickProvider options={clickOptions}>
        <ThemeProviderStyled theme={cpsrTheme}>
          <ApolloProvider client={client}>
            <QueryClientProvider client={queryClient}>
              <ContextComp>
                <ThemeProvider enableSystem={false} attribute="class">
                  <Component {...pageProps} />
                </ThemeProvider>
              </ContextComp>
            </QueryClientProvider>
          </ApolloProvider>
        </ThemeProviderStyled>
      </ClickProvider>
    </div>
  );
};

const ContextComp = ({ children }) => {
  const statusInfos = useGetStatusInfos();
  const era = statusInfos.data?.result.last_added_block_info.era_id || 0;
  const validatorsQuery = useGetAllValidators(era);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isOpenMenu,
        setIsOpenMenu,
        validators:
          validatorsQuery?.data?.data?.map(item => {
            return {
              publicKey: item.public_key,
              fee: item.fee,
              name: item.account_info?.info.owner?.name,
              img:
                item.account_info?.info.owner?.branding?.logo?.png_256 ||
                item.account_info?.info.owner?.branding?.logo?.png_1024 ||
                getAvatarUrl(item.public_key),
            };
          }) || [],
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default App;
