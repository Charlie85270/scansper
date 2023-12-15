"use client";
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

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(true);
  const [theme, setTheme] = useState();
  useEffect(() => {
    import("@make-software/csprclick-ui")
      .then(mod => {
        setTheme(mod.CsprClickThemes.light);
      })
      .finally(() => {
        setIsloading(false);
      }),
      {
        ssr: false,
      };
  }, []);

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (isLoading || !theme) {
    return <p>Loading</p>;
  }
  return (
    <div id="root">
      <ClickProvider options={clickOptions}>
        <ThemeProviderStyled theme={theme}>
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
