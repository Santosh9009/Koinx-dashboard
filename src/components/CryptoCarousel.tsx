"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {MiniChart} from "@/components/MiniChart";
import axios from "axios";

const CryptoCarousel = () => {
  const [recommendedCoins, setRecommendedCoins] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch top coins by market cap for "You May Like" section
        const topCoinsResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            headers: {
              "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY
            },
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 5,
              page: 1,
              sparkline: false
            }
          }
        );

        // Fetch trending coins
        const trendingResponse = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending",
          {
            headers: {
              "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY
            }
          }
        );

        setRecommendedCoins(topCoinsResponse.data);
        setTrendingCoins(trendingResponse.data.coins.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-white">
    <div className="px-20 mx-auto p-6 space-y-8">
      {/* You May Like Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">You May Like</h2>
        <Carousel className="relative">
          <CarouselContent>
            {recommendedCoins.map((coin:any) => (
              <CarouselItem key={coin.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="mx-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src={coin.image}
                        alt={coin.symbol}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="font-medium">
                        {coin.symbol.toUpperCase()}
                      </span>
                    </div>
                    <MiniChart coinId={coin.id} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Trending Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Trending</h2>
        <Carousel className="relative">
          <CarouselContent>
            {trendingCoins.map((coin:any) => (
              <CarouselItem key={coin.item.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="mx-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src={coin.item.small}
                        alt={coin.item.symbol}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="font-medium">
                        {coin.item.symbol.toUpperCase()}
                      </span>
                    </div>
                    <MiniChart coinId={coin.item.id} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
    </div>

  );
};

export default CryptoCarousel;