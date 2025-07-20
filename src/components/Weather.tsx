import React from "react";
import { mockWeather } from "../mocks/mockData";

export const Weather: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow h-full  min-h-[100px] overflow-auto">
      <h2 className="text-xl font-bold mb-2">🌤 Clima</h2>
      <p className="font-semibold">{mockWeather.location}</p>
      <p>{mockWeather.temperature} - {mockWeather.condition}</p>
    </div>
  );
};
