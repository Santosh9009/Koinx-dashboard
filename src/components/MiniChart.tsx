"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceData {
  usd: number;
  usd_24h_change: number;
}

interface ChartDataType {
  labels: string[];
  datasets: {
    data: number[];
    borderColor: string;
    borderWidth: number;
    pointRadius: number;
    tension: number;
    fill: boolean;
  }[];
}

interface MiniChartProps {
  coinId: string;
}

export const MiniChart = ({ coinId }: MiniChartProps) => {
  const [chartData, setChartData] = useState<ChartData<'line'> | null>(null);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chartResponse, priceResponse] = await Promise.all([
          axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
            {
              headers: { "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY },
              params: { vs_currency: "usd", days: "7", interval: "daily" }
            }
          ),
          axios.get("https://api.coingecko.com/api/v3/simple/price", {
            headers: { "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY },
            params: { ids: coinId, vs_currencies: "usd", include_24hr_change: true }
          })
        ]);

        const prices: [number, number][] = chartResponse.data.prices;
        const { usd, usd_24h_change } = priceResponse.data[coinId];

        setPriceData({ usd, usd_24h_change });
        setChartData({
          labels: prices.map(([timestamp]) => new Date(timestamp).toLocaleDateString()),
          datasets: [
            {
              data: prices.map(([, price]) => price),
              borderColor: usd_24h_change >= 0 ? "#22c55e" : "#ef4444",
              borderWidth: 2,
              pointRadius: 0,
              tension: 0.4,
              fill: false
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coinId]);

  if (isLoading) {
    return <div className="h-32 flex items-center justify-center">Loading...</div>;
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (context:any) =>
            `$${context.raw.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`
        }
      }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    }
  };

  return (
    <div>
      {priceData && (
        <div className="mb-2 space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-bold">
              ${priceData.usd.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6
              })}
            </span>
            <span
              className={`text-sm ${
                priceData.usd_24h_change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {priceData.usd_24h_change.toFixed(2)}%
            </span>
          </div>
        </div>
      )}
      <div className="h-32">
        {chartData && <Line data={chartData} options={options} />}
      </div>
    </div>
  );
};