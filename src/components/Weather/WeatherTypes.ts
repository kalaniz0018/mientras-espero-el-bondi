// src/components/Weather/WeatherTypes.ts

export type Daypart = "mañana" | "tarde" | "noche";

export type WeatherForecastItem = {
  period: Daypart;
  min: number;          // °C
  max: number;          // °C
  pop?: number;         // probabilidad de precipitación (0–100)
};

export type WeatherData = {
  location: string;
  temperature: number;        // °C
  feelsLike?: number;         // °C
  condition: string;          // "Soleado", "Lluvia", etc.
  precipitationProb?: number; // 0–100
  windKmh?: number;           // km/h
  uvIndex?: number;           // 0–11+
  humidity?: number;          // %
  forecast?: WeatherForecastItem[];
};

// Tipo auxiliar para datos crudos que vienen del backend o mock
export type RawWeatherData = Record<string, unknown>;
