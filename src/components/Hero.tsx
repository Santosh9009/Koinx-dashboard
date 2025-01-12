import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TradingViewChart from "./TradingViewChart";
import BitcoinPriceHeader from "./PriceHeader";

export default function Hero() {
  return (
    <section className="h-screen rounded-md shadow-lg overflow-hidden">
      <div className="min-h-screen bg-white p-4 md:p-6 ">
        <BitcoinPriceHeader />
        <div className="">
          <TradingViewChart />
        </div>
      </div>
    </section>
  );
}
