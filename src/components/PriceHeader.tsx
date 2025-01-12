"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowUpIcon } from "lucide-react";
import BitcoinLogo from '../../public/image 160.png'
import Image from 'next/image';

const BitcoinPriceHeader = () => {
  const [bitcoinData, setBitcoinData] = useState<any>(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_COINGECKO_API_URL+"/simple/price"  || '',{
          headers: {
            "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
          },
          params:{
            ids: "bitcoin",
            vs_currencies: "usd,inr",
            include_market_cap: true,
            include_24hr_change: true,
          }
      });
      console.log(response.data);
        setBitcoinData(response.data.bitcoin); // response.data.bitcoin contains the price data
      } catch (error) {
        console.error('Failed to fetch Bitcoin price:', error);
      }
    };

    fetchBitcoinPrice();
  }, []);

  if (!bitcoinData) {
    return <div>Loading...</div>;
  }

  const usdPrice = bitcoinData.usd;
  const inrPrice = bitcoinData.inr;
  const priceChange = bitcoinData.usd_24h_change;

  return (
    <div className="space-y-6">
      {/* Bitcoin title and rank */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 relative">
           <Image src={BitcoinLogo} alt="Bitcoin logo" width={30} height={30} />
          </div>
          <span className="font-semibold text-2xl">Bitcoin</span>
          <span className="text-gray-500 text-2xl">BTC</span>
        </div>
        <div className="bg-gray-500/20 px-3 py-1.5 rounded-lg">
          <span className="text-sm text-gray-600 font-medium">Rank #1</span>
        </div>
      </div>

      {/* Price section */}
      <div className="space-y-1">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold">${usdPrice.toLocaleString()}</span>
          <div
            className={`flex items-center gap-2 ${
              priceChange > 0 ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
            } px-2 py-1 rounded`}
          >
            <ArrowUpIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{priceChange.toFixed(2)}%</span>
          </div>
          <span className="text-gray-500 text-sm">(24H)</span>
        </div>
        <div className="text-gray-600">
          ₹ {inrPrice}
        </div>
      </div>
    </div>
  );
};

export default BitcoinPriceHeader;
