import React, { useEffect, useRef } from "react";

import AppLayout from "../../../components/layout/AppLayout";
import { useTheme } from "next-themes";
import useWindowSize from "../../../hooks/useWindowSize";
import Card from "../../../components/shared/Card/Card";

export const MarketCapCompare = () => {
  const { height } = useWindowSize();
  const { theme } = useTheme();
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    // console.log(
    //   (ref.current?.contentWindow?.document.body.scrollHeight || 0) + 20 + "px"
    // );
  });
  return (
    <AppLayout
      title="Scansper | Market cap comparator"
      desc="Compare the market cap of casper with other currencies"
    >
      <Card>
        <iframe
          src={`https://thecoinperspective.com/widgets/comparison?c=casper-network&vs=ethereum&showControls=true&fx=USD&theme=${
            theme || "light"
          }`}
          ref={ref}
          style={{
            padding: "3px",
            width: "100%",
          }}
          frameBorder="0"
          height={(height || 0) - 140}
          allowTransparency={true}
        ></iframe>
      </Card>
    </AppLayout>
  );
};

export default MarketCapCompare;
