// src/components/Weather/WeatherLogic.ts

import type { RawWeatherData, WeatherData, WeatherForecastItem } from "./WeatherTypes";


const toNum = (v: unknown): number => {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const m = v.match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : NaN;
  }
  return NaN;
};

export const normalizeWeather = (raw: RawWeatherData): WeatherData => {
  return {
    location: (raw.location as string) ?? "Cerca tuyo",
    temperature: toNum(raw.temperature),
    feelsLike: raw.feelsLike !== undefined ? toNum(raw.feelsLike) : undefined,
    condition: (raw.condition as string) ?? "—",
    precipitationProb:
      raw.precipitationProb !== undefined ? toNum(raw.precipitationProb) : undefined,
    windKmh: raw.windKmh !== undefined ? toNum(raw.windKmh) : undefined,
    uvIndex: raw.uvIndex !== undefined ? toNum(raw.uvIndex) : undefined,
    humidity: raw.humidity !== undefined ? toNum(raw.humidity) : undefined,
    forecast: Array.isArray(raw.forecast)
      ? (raw.forecast as RawWeatherData[])
          .map((f): WeatherForecastItem => ({
            period: f.period as WeatherForecastItem["period"],
            min: toNum(f.min),
            max: toNum(f.max),
            pop: f.pop !== undefined ? toNum(f.pop) : undefined,
          }))
          .filter((f) => !Number.isNaN(f.min) && !Number.isNaN(f.max))
      : undefined,
  };
};
