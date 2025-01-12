import Hero from "@/components/Hero";
import Navbar from "@/components/Navbaar";
import Sideview from "@/components/Sideview";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import Performance from "@/components/Performance";
import TeamSection from "@/components/Team";
import About from "@/components/About";
import Tokenomics from "@/components/Tokenomics";
import TradingViewChart from "@/components/TradingViewChart";
import CryptoCarousel from "@/components/CryptoCarousel";

export default function Dashboard() {
  return (
    <div className="bg-gray-200 w-screen">
      <Navbar />
      <div className="md:p-10 p-5">
        <div className="flex px-2">
          <h1>Cryptocurrencies</h1>
          <ChevronsRight />
          <h1>Bitcoin</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-6 gap-5">
          {/* Main content container */}
          <div className="w-[100%] md:w-[70%] rounded-lg">
            <Hero />
            <Performance />
            <About/>
            <Tokenomics/>
            <TeamSection/>
          </div>
          {/* Sideview visible only on medium and larger screens */}
          <div className="md:w-[30%]">
            <Sideview />
          </div>
        </div>
      </div>
      <CryptoCarousel/>
    </div>
  );
}
