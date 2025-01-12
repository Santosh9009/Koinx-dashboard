"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import sideImage from "../../public/BlueIcon.png";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

const Sideview = () => {
  const [trendingCoins, setTrendingCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch trending coins from CoinGecko API
    const fetchTrendingCoins = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_COINGECKO_API_URL}/search/trending`,
          {
            headers: {
              "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
            },
          }
        );

        const trendingCoinIds = response.data.coins
          .slice(0, 3)
          .map((coin: any) => coin.item.id);

        // Fetch market data for top trending coins
        const marketDataResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_COINGECKO_API_URL}/coins/markets`,
          {
            params: {
              vs_currency: "usd",
              ids: trendingCoinIds.join(","),
            },
            headers: {
              "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
            },
          }
        );

        const coinsWithMarketData = response.data.coins
          .slice(0, 3)
          .map((coin: any, index: number) => ({
            ...coin.item,
            marketData: marketDataResponse.data[index],
          }));

        setTrendingCoins(coinsWithMarketData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
        setLoading(false);
      }
    };

    fetchTrendingCoins();
  }, []);

  return (
    <div className="flex flex-col min-w-60">
      {/* Main Section */}
      <div className="flex flex-col justify-center items-center text-center bg-[#0052FE] text-white p-6 rounded-xl shadow-lg w-full gap-8">
        <h1 className="font-bold text-2xl mt-6">
          Get Started with KoinX for FREE
        </h1>
        <p className="text-center mb-4">
          With our range of features that you can equip for free, KoinX allows
          you to be more educated and aware of your tax reports.
        </p>
        <div className="relative w-40 h-40">
          <Image src={sideImage} alt="Side Image" className="mt-4" />
        </div>

        <Button className="dark mt-5 font-semibold" variant="default">
          Get Started Free
          <ArrowRight size={16} />
        </Button>
      </div>

      {/* Trending Coins Section */}
      <div className="flex flex-col mt-8 bg-white p-6 rounded-md shadow-lg w-full">
        <h2 className="font-bold text-xl mb-4">Trending Coins (24h)</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {trendingCoins.map((coin) => (
              <div
                key={coin.id}
                className="flex justify-between items-center text-sm"
              >
                <span className="font-semibold">
                  {coin.name} ({coin.symbol?.toUpperCase()})
                </span>
                <span
                  className={`${
                    coin.marketData.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.marketData.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sideview;
