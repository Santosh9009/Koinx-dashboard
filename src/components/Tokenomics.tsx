"use client";
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, PointElement } from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, PointElement);

const Tokenomics = () => {
  const data = {
    labels: ['Crowdsale investors', 'Foundation'],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ['#2196F3', '#FFA500'],
        borderColor: ['#2196F3', '#FFA500'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1, 
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true, 
          pointStyle: 'circle', 
          boxWidth: 10, 
          boxHeight: 10, 
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem:any) => {
            const percentage = tooltipItem.raw;
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
    cutout: '70%', 
  };

  return (
    <div className="mx-auto p-6 space-y-6 bg-white rounded-md mt-6">
      <h1 className="text-3xl font-bold">Tokenomics</h1>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Initial Distribution</h2>
        
        <div className="h-[400px] w-full">
          <Pie data={data} options={options} />
        </div>

        <p className="text-gray-700 mt-6 text-justify">
          Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare vestibulum nunc dignissim vel consequat. Leo etiam nascetur bibendum amet enim sit eget leo amet. At metus orci augue fusce eleifend lectus eu fusce adipiscing. Volutpat ultrices nibh sodales massa habitasse urna felis augue. Gravida aliquam fermentum augue eu. Imperdiet bibendum amet aliquam donec. Eget justo dui metus odio rutrum. Vel ipsum eget in at curabitur sem posuere facilisis vitae. Sed lorem sit mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu ac risus.
        </p>
      </div>
    </div>
  );
};

export default Tokenomics;
