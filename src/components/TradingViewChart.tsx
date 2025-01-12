"use client";
import React, { useEffect, useRef, memo, useState } from "react";

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null); // Explicitly type as RefObject<HTMLDivElement>
  const [activeTimeframe, setActiveTimeframe] = useState("7D");

  useEffect(() => {
    if (container.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "CRYPTO:BTCUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "3",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_top_toolbar": true,
          "hide_legend": true,
          "hide_side_toolbar": true,
          "allow_symbol_change": false,
          "save_image": false,
          "height": 400,
          "calendar": false,
          "hide_volume": true,
          "support_host": "https://www.tradingview.com",
          "backgroundColor": "rgba(255, 255, 255, 1)",
          "gridColor": "rgba(230, 230, 230, 1)",
          "container_id": "tv_chart_container",
          "studies": [],
          "overrides": {
            "mainSeriesProperties.style": 0,
            "mainSeriesProperties.lineStyle.color": "#0052FF",
            "mainSeriesProperties.lineStyle.linewidth": 2,
            "paneProperties.background": "#ffffff",
            "paneProperties.vertGridProperties.color": "#E6E6E6",
            "paneProperties.horzGridProperties.color": "#E6E6E6",
            "scalesProperties.textColor": "#999999",
            "scalesProperties.lineColor": "#E6E6E6"
          }
        }`;
      container.current.appendChild(script);
    }
  }, []);

  const timeframes = [
    { label: "1H", value: "1H" },
    { label: "24H", value: "24H" },
    { label: "7D", value: "7D" },
    { label: "1M", value: "1M" },
    { label: "3M", value: "3M" },
    { label: "6M", value: "6M" },
    { label: "1Y", value: "1Y" },
    { label: "ALL", value: "ALL" },
  ];

  return (
    <div className="space-y-4 bg-white">
      {/* Timeframes and Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Bitcoin Price Chart (USD)</h2>
        <div className="flex gap-4 text-sm flex-wrap">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.value}
              onClick={() => setActiveTimeframe(timeframe.value)}
              className={`${
                activeTimeframe === timeframe.value
                  ? "text-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </div>

      {/* TradingView Widget Container */}
      <div
        className="tradingview-widget-container relative"
        ref={container}
        style={{
          height: "calc(100vh - 200px)", // Adjusts based on the viewport height
          width: "100%",
        }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{
            height: "100%",
            width: "100%",
          }}
        ></div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
