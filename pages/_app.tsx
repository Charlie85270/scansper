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

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ContextComp>
          <ThemeProvider enableSystem={false} attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </ContextComp>
      </QueryClientProvider>
    </ApolloProvider>
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
                item.account_info?.info.owner?.branding.logo.png_256 ||
                item.account_info?.info.owner?.branding.logo.png_1024 ||
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
