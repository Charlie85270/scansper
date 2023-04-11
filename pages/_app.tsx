import { FC, useState } from "react";
import { AppProps } from "next/app";
import "../global.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ThemeProvider } from "next-themes";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppContext from "../AppContext";
import { useGetAllValidators } from "../hooks/useGetAllValidators";
import { useGetStatusInfos } from "../hooks/useGetStatusInfos";
import { getAvatarUrl } from "../utils/Utils";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextComp>
        <ThemeProvider enableSystem={false} attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </ContextComp>
    </QueryClientProvider>
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
              name: item.account_info?.info.owner.name,
              img:
                item.account_info?.info.owner.branding.logo.png_256 ||
                item.account_info?.info.owner.branding.logo.png_1024 ||
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
