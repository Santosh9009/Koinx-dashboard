import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ethimage from "../../public/etherum.webp";
import bitcoinimage from "../../public/bitcoin.webp";
import tether from "../../public/tether.webp";
import litecoinimage from "../../public/litecoin.webp";

const FloatingIcon = ({ src, alt, className }) => (
  <div className={`absolute ${className} animate-float`}>
    <Image src={src} alt={alt} width={48} height={48} className="rounded-full" />
  </div>
);

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-green-900" />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Image src="/logo.svg" alt="KoinX" width={120} height={40} />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white">Products</a>
              <a href="#" className="text-gray-300 hover:text-white">Resource Centre</a>
              <a href="#" className="text-gray-300 hover:text-white">Free Crypto Tools</a>
              <a href="#" className="text-gray-300 hover:text-white">Pricing</a>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-48">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Gateway to Crypto <br />
            Taxes and Accounting
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Cutting-edge technology for all your crypto tax needs
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
            Get Started for FREE <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Floating Icons */}
      <FloatingIcon src={bitcoinimage} alt="Bitcoin" className="top-1/4 right-1/4" />
      <FloatingIcon src={ethimage} alt="Ethereum" className="bottom-1/3 left-1/4" />
      <FloatingIcon src={litecoinimage} alt="Litecoin" className="top-1/3 left-1/3" />
      <FloatingIcon src={tether} alt="Tether" className="top-1/2 right-1/5" />
    </div>
  );
}
