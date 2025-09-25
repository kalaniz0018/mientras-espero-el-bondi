import React from "react";
import { mockWeather } from "../mocks/mockData";
import { Card } from "./UI/Card";

type WeatherProps = {
  className?: string;
};

export const Weather: React.FC<WeatherProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <Card title="Clima" icon="🌤">
        <p className="font-semibold">{mockWeather.location}</p>
        <p>
          {mockWeather.temperature} – {mockWeather.condition}
        </p>
      </Card>
    </div>
  );
};
