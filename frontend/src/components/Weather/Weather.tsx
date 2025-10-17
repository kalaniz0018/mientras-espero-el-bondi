// src/components/Weather/Weather.tsx
import React from "react";
import { Card } from "../UI/Card";
import { normalizeWeather } from "./WeatherLogic";
import { pickWeatherIcon } from "./WeatherIcons";
import { buildWeatherMessage } from "./WeatherMessages";
import { getMockWeatherFor } from "../../mocks/mockWather";

type WeatherProps = { className?: string };

export const Weather: React.FC<WeatherProps> = ({ className = "" }) => {
  //para forzar un caso
    //const data = normalizeWeather(getMockWeatherFor(6));
  const data = normalizeWeather(getMockWeatherFor(new Date())); 

  const icon = pickWeatherIcon(data.condition);
  const message = buildWeatherMessage(data);

  return (
    <div className={className}>
      <Card title="Clima" icon={icon}>
        {/* Ubicación */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold">{data.location}</span>
        </div>

        {/* Temp principal */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-extrabold leading-none">
            {Math.round(data.temperature)}°C
          </span>
          {data.feelsLike !== undefined && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              (sensación {Math.round(data.feelsLike)}°C)
            </span>
          )}
        </div>

        {/* Condición como pill */}
        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 mb-2">
          {data.condition}
        </div>
        {message && <div className="mt-1 mb-1 text-[13px] ">{message}</div>}
        {/* Pronóstico en chips */}
        {/* Pronóstico: mañana / tarde / noche, uno por línea */}
        {data.forecast && data.forecast.length > 0 && (
          <div className="flex flex-col gap-2 mb-2">
            {data.forecast.map((f, idx) => {
              // Mostrar POP solo si existe y es relevante
              const hasPop = typeof f.pop === "number" && !Number.isNaN(f.pop);
              const showPop = hasPop && f.pop! >= 25; // umbral suave: 25%
              return (
                <div
                  key={idx}
                  className="w-fit px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs"
                >
                  <span className="font-semibold capitalize">{f.period}</span>
                  <span className="mx-1">•</span>
                  <span>
                    {Math.round(f.min)}°–{Math.round(f.max)}°
                  </span>
                  {showPop && (
                    <>
                      <span className="mx-1">•</span>
                      {/* texto neutral: precip. (no “lluvia” fijo) */}
                      <span>{Math.round(f.pop!)}% precip.</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Weather;
