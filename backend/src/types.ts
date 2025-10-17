// Tipos concretos y legibles
export type WeatherCard = {
  id: string;
  card: "Weather";
  title: string;
  location: string;
  temperatureC: number;
  condition: string;
  updatedAtIso: string;
};

export type DolarCard = {
  id: string;
  card: "Dolar";
  title: string;
  oficial: number;
  blue: number;
};

export type EfemeridesItem = { year: number; text: string; source: string };
export type EfemeridesCard = {
  id: string;
  card: "Efemerides";
  title: string;
  items: EfemeridesItem[];
};

export type NextFeriadoCard = {
  id: string;
  card: "NextFeriado";
  title: string;
  name: string;
  dateIso: string;
  isLongWeekend: boolean;
};

export type DashboardCard =
  | WeatherCard
  | DolarCard
  | EfemeridesCard
  | NextFeriadoCard;
