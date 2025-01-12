import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const SimpleCarousel = ({ items }:{items:any}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Array of light background colors
  const colors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-pink-100",
    "bg-purple-100",
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      {/* Carousel Wrapper */}
      <div
        className="flex transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Adjusted to 100% to show one full item at a time on mobile
        }}
      >
        {items.map((item:any, index:number) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-[66.67%] p-4" // 100% width on mobile and 66.67% on larger screens
          >
            <div
              className={`flex rounded-lg p-6 shadow-md min-h-56 ${colors[index]}`}
            >
              <div className="relative w-16 h-16">
                <Image alt={item.title} src={item.icon} />
              </div>
              <div className="ml-3">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-4">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md "
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default SimpleCarousel;
