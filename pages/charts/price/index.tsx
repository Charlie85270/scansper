import React, { useEffect, useRef } from "react";

import AppLayout from "../../../components/layout/AppLayout";
import { useTheme } from "next-themes";
import useWindowSize, { Size } from "../../../hooks/useWindowSize";

let tvScriptLoadingPromise;
export const ChartPrice = () => {
  const { theme } = useTheme();
  const onLoadScriptRef = useRef<any>();
  const size: Size = useWindowSize();
  useEffect(() => {
    onLoadScriptRef.current = createWidget;
    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise(resolve => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_bf6bc") &&
        "TradingView" in window
      ) {
        new (window.TradingView as any).widget({
          height: (size.height || 0) - 140,
          symbol: "OKX:CSPRUSDT",
          interval: "H",
          width: "100%",
          timezone: "Etc/UTC",
          theme: theme || "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_bf6bc",
        });
      }
    }
  }, [size]);
  return (
    <AppLayout
      title="Scansper | Price chart"
      desc="The live Casper price chart"
    >
      <div className="tradingview-widget-container">
        <div id="tradingview_bf6bc" />
      </div>
    </AppLayout>
  );
};

export default ChartPrice;
