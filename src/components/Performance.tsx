"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import SentimentComponent from "./Sentiment ";
import { Coins } from "lucide-react";

const tabs = [
  { value: "overview", title: "Overview" },
  { value: "fundamentals", title: "Fundamentals" },
  { value: "new-insights", title: "New Insights" },
  { value: "sentiment", title: "Sentiment" },
  { value: "team", title: "Team" },
  { value: "technical", title: "Technical" },
  { value: "tokenomics", title: "Tokenomics" },
];

export default function Performance() {
  const [data, setData] = useState({
    market: {
      high: 0,
      low: 0,
      current: 0,
      high52w: 0,
      low52w: 0,
    },
    fundamentals: {
      price: 0,
      low24h: 0,
      high24h: 0,
      sentiment :0,
      tradingVolume: 0,
      marketCapRank: 0,
      marketCap: 0,
      marketCapDominance: 0,
      volumeMarketCap: 0,
      allTimeHigh: 0,
      allTimeLow: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Fetch today's high/low and 52-week data
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin",
          {
            headers: {
              "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
            },
            params: {
              localization: false,
            },
          }
        );

        console.log(response.data)

        const market = response.data.market_data;
        const high = market.high_24h.usd;
        const low = market.low_24h.usd;
        const current = market.current_price.usd;
        const high52w = market.ath.usd;
        const low52w = market.atl.usd;

        const fundamentals = {
          price: market.current_price.usd,
          low24h: market.low_24h.usd,
          high24h: market.high_24h.usd,
          sentiment : market.sentiment_votes_up_percentage,
          tradingVolume: market.total_volume.usd,
          marketCapRank: market.market_cap_rank,
          marketCap: market.market_cap.usd,
          marketCapDominance: market.market_cap_dominance,
          volumeMarketCap: market.total_volume.usd / market.market_cap.usd,
          allTimeHigh: market.ath.usd,
          allTimeLow: market.atl.usd,
        };

        setData({
          market: { high, low, current, high52w, low52w },
          fundamentals,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const calculatePercentage = (value: number, high: number, low: number) => {
    return ((value - low) / (high - low)) * 100;
  };

  return (
    <div className="overflow-hidden">
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="my-4 bg-transparent space-x-6">
        {tabs.map((tab) => (
          <TabsTrigger
            className="data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-blue-500 rounded-none"
            key={tab.value}
            value={tab.value}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="overview">
        <Card className="p-2">
          <CardHeader className="mb-5">
            <CardTitle className="text-2xl font-base">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {/* Today's Range */}
                <div className="space-y-6">
                  <div className="space-y-6 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-gray-500">
                        Today's Low: <p className="text-black">${data.market.low.toFixed(2)}</p>
                      </div>
                      <div className="relative w-full max-w-2xl h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
                        <div
                          className="absolute w-4 h-4 bg-blue-500 rounded-full -top-1"
                          style={{
                            left: `${calculatePercentage(
                              data.market.current,
                              data.market.high,
                              data.market.low
                            )}%`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          <p className="relative top-5">
                            ${data.market.current.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-500">
                        High: <p className="text-black">${data.market.high.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* 52-Week Range */}
                  <div className="space-y-6 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-gray-500">
                        52W Low:{" "}
                        <p className="text-black">
                          ${data.market.low52w.toFixed(2)}
                        </p>
                      </div>
                      <div className="relative w-full max-w-2xl h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
                      <div className="text-gray-500">
                        52W High: <p className="text-black">${data.market.high52w.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fundamentals Section */}
                <div className="my-6">
                <h3 className="text-lg font-semibold text-gray-700 my-3">Fundamentals</h3>
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <p className="text-gray-500 border-b border-gray-300 pb-2 mb-2">Bitcoin Price: <span className="text-black">${data.fundamentals.price.toFixed(2)}</span></p>
                    <p className="text-gray-500 border-b border-gray-300 pb-2 mb-2">24h Low / High: <span className="text-black">${data.fundamentals.low24h.toFixed(2)} / ${data.fundamentals.high24h.toFixed(2)}</span></p>
                    <p className="text-gray-500 border-b border-gray-300 pb-2 mb-2">Sentiment: <span className="text-black">${data.fundamentals.sentiment}%</span></p>
                    <p className="text-gray-500 border-b border-gray-300 pb-2 mb-2">Trading Volume: <span className="text-black">${data.fundamentals.tradingVolume.toFixed(2)}</span></p>
                    <p className="text-gray-500 border-b border-gray-300 pb-2 mb-2">Market Cap Rank: <span className="text-black">{data.fundamentals.marketCapRank}</span></p>
                  </div>
                  <div>
                    <p className="text-gray-500 border-b border-gray-300 pb-2 mb-2">Market Cap: <span className="text-black">${data.fundamentals.marketCap.toFixed(2)}</span></p>
                    <p className="text-gray-500 border-b border-gray-300 pb-2 mb-2">Market Cap Dominance: <span className="text-black">{data.fundamentals.marketCapDominance?.toFixed(2)}%</span></p>
                    <p className="text-gray-500 border-b border-gray-300 pb-2 mb-2">Volume / Market Cap: <span className="text-black">{(data.fundamentals.volumeMarketCap * 100).toFixed(2)}%</span></p>
                    <p className="text-gray-500 border-b border-gray-300 pb-2 mb-2">All-Time High: <span className="text-black">${data.fundamentals.allTimeHigh.toFixed(2)}</span></p>
                    <p className="text-gray-500 border-b border-gray-300 pb-2 mb-2">All-Time Low: <span className="text-black">${data.fundamentals.allTimeLow.toFixed(2)}</span></p>
                  </div>
                </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <SentimentComponent/>
      </TabsContent>
    </Tabs>
    </div>

  );
}
