import React from "react";
import { mockWeather } from "../mocks/mockData";

type WeatherProps = {
  className?: string;
};

export const Weather: React.FC<WeatherProps> = ({ className = "" }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 text-black dark:text-white bg-white p-4 rounded-xl shadow h-full min-h-[100px] ${className}`}>
      <h2 className="text-xl font-bold mb-2">🌤 Clima</h2>
      <p className="font-semibold">{mockWeather.location}</p>
      <p>{mockWeather.temperature} - {mockWeather.condition}</p>
    </div>
  );
};
