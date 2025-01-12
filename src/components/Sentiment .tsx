import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CustomCarousel from "./CarouselComponent";
import { Item } from "@radix-ui/react-select";
import Icon1 from '../../public/SentimentIcon_1.png'
import Icon2 from '../../public/SentimentIcon_2.png'

const SentimentComponent = () => {
  const keyEvents = [
    {
      id: 1,
      icon: Icon1,
      title: "Market Insights",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum.",
    },
    {
      id: 2,
      icon: Icon2,
      title: "Growth Potential",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sed vitae sit nisi viverra natoque lacinia libero enim.",
    },
    // {
    //   id: 3,
    //   icon: "📊",
    //   title: "Quarterly Results",
    //   description:
    //     "Vivamus tincidunt augue eget orci volutpat, nec tristique lacus vehicula. Integer mollis sapien nec eros aliquam.",
    // },
    // {
    //   id: 4,
    //   icon: "🌐",
    //   title: "Global Trends",
    //   description:
    //     "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    // },
    // {
    //   id: 5,
    //   icon: "🧩",
    //   title: "New Innovations",
    //   description:
    //     "Aliquam consectetur metus non orci suscipit, ut sollicitudin lectus dapibus. Curabitur ut mi ac nisi auctor accumsan.",
    // },
  ];

  return (
    <Card className=" my-6">
      <CardHeader>
        <CardTitle className="text-2xl font-base">Sentiment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Sentiment Carousel */}
          <h1 className="text-lg font-semibold text-gray-800">Key Events</h1>
          <CustomCarousel items={keyEvents} />

          {/* Analyst Estimates */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Analyst Estimates
            </h3>
            <div className="mt-6 flex justify-start items-center gap-6 px-6">
              <div className="flex flex-col items-center mr-4 ">
                <div className="relative text-2xl font-bold text-green-500 rounded-full bg-green-100 h-28 w-28 flex items-center justify-center">
                  <p>76%</p>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <p>Buy</p>
                  <div
                    className=" h-2  bg-green-500 rounded-full"
                    style={{ width: "76%" }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <p>Hold</p>
                  <div
                    className="h-2 bg-gray-400 rounded-full"
                    style={{ width: "8%" }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <p>Sell</p>

                  <div
                    className="h-2 bg-red-500 rounded-full"
                    style={{ width: "16%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentComponent;
