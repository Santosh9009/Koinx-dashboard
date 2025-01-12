import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import image1 from "../../public/about1.png";
import image2 from "../../public/about2.png";

const About = () => {
  const bitcoinData = {
    price: 16951.82,
    volume24h: 19.14,
    change24h: 0.36,
    change7dHigh: -7.7,
    change7dLow: 3.4,
    circulatingSupply: 19.24,
    maxSupply: 21,
  };

  return (
    <div className="mx-auto p-6 space-y-12 bg-white rounded-xl max-w-7xl">
      {/* Section 1: About Bitcoin */}
      <section>
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
          About Bitcoin
        </h1>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">What is Bitcoin?</h2>
          <p className="text-gray-700">
            Bitcoin's price today is US$
            {bitcoinData.price.toLocaleString()}, with a 24-hour trading volume
            of ${bitcoinData.volume24h}B. BTC is +{bitcoinData.change24h}% in
            the last 24 hours. It is currently {bitcoinData.change7dHigh}% from
            its 7-day all-time high of $18,366.66, and {bitcoinData.change7dLow}
            % from its 7-day all-time low of $16,394.75. BTC has a circulating
            supply of {bitcoinData.circulatingSupply}M BTC and a max supply of{" "}
            {bitcoinData.maxSupply}M BTC.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>
              Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit
              lobortis tristique pharetra. Diam id et lectus urna et tellus
              aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut
              sed. Quam scelerisque fermentum sapien morbi sodales odio sed
              rhoncus.
            </p>
            <p>
              Diam praesent massa dapibus magna aliquam a dictumst volutpat.
              Egestas vitae pellentesque auctor amet. Nunc sagittis libero
              adipiscing cursus felis pellentesque interdum.
            </p>
            <p>
              Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam
              massa vel convallis duis ac. Mi adipiscing semper scelerisque
              porttitor pulvinar nunc risus.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Holding Bitcoin */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
          Already Holding Bitcoin?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <Card className="bg-gradient-to-br from-emerald-400 to-blue-500">
            <CardContent className="flex items-center gap-6 p-6">
              <Image
                src={image1}
                alt="about1"
                className="w-24 h-24 object-contain"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Calculate your Profits
                </h3>
                <Button
                  variant="secondary"
                  className="bg-white text-black hover:bg-gray-100"
                >
                  Check Now <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-gradient-to-br from-orange-400 to-red-500">
            <CardContent className="flex items-center gap-6 p-6">
              <Image
                src={image2}
                alt="about2"
                className="w-24 h-24 object-contain"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Calculate your Tax Liability
                </h3>
                <Button
                  variant="secondary"
                  className="bg-white text-black hover:bg-gray-100"
                >
                  Check Now <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="mt-6 text-gray-700 text-center md:text-left">
          Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam
          massa vel convallis duis ac. Mi adipiscing semper scelerisque
          porttitor pulvinar nunc risus.
        </p>
      </section>
    </div>
  );
};

export default About;
