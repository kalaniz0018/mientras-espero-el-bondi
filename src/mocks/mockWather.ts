import type { RawWeatherData } from "../components/Weather/WeatherTypes";

export const mockWeatherCases: RawWeatherData[] = [
  // 0) Soleado templado (otoño/primavera)
  {
    location: "Ciudad de Buenos Aires",
    temperature: "24°C",
    feelsLike: "25°C",
    condition: "Soleado",
    precipitationProb: "5%",
    windKmh: "12 km/h",
    uvIndex: "6",
    humidity: "45%",
    forecast: [
      { period: "mañana", min: "15", max: "21", pop: "5" },
      { period: "tarde",  min: "21", max: "26", pop: "10" },
      { period: "noche",  min: "19", max: "21" },
    ],
  },

  // 1) Nubosidad variable (clásico porteño)
  {
    location: "Ciudad de Buenos Aires",
    temperature: "21°C",
    feelsLike: "21°C",
    condition: "Parcialmente nublado",
    precipitationProb: "15%",
    windKmh: "14 km/h",
    uvIndex: "5",
    humidity: "55%",
    forecast: [
      { period: "mañana", min: "16", max: "20", pop: "10" },
      { period: "tarde",  min: "20", max: "23", pop: "20" },
      { period: "noche",  min: "18", max: "20", pop: "15" },
    ],
  },

  // 2) Nublado sin precipitaciones
  {
    location: "Ciudad de Buenos Aires",
    temperature: "18°C",
    feelsLike: "18°C",
    condition: "Nublado",
    precipitationProb: "10%",
    windKmh: "9 km/h",
    uvIndex: "2",
    humidity: "60%",
    forecast: [
      { period: "mañana", min: "14", max: "17" },
      { period: "tarde",  min: "17", max: "19", pop: "15" },
      { period: "noche",  min: "15", max: "17" },
    ],
  },

  // 3) Lluvias aisladas (chaparrones típicos)
  {
    location: "Ciudad de Buenos Aires",
    temperature: "22°C",
    feelsLike: "22°C",
    condition: "Chubascos",
    precipitationProb: "40%",
    windKmh: "18 km/h",
    uvIndex: "3",
    humidity: "70%",
    forecast: [
      { period: "mañana", min: "18", max: "20", pop: "25" },
      { period: "tarde",  min: "20", max: "23", pop: "45" },
      { period: "noche",  min: "19", max: "21", pop: "35" },
    ],
  },

  // 4) Tormenta de verano (poco frecuente, pero real)
  {
    location: "Ciudad de Buenos Aires",
    temperature: "28°C",
    feelsLike: "31°C",
    condition: "Tormenta",
    precipitationProb: "80%",
    windKmh: "30 km/h",
    uvIndex: "5",
    humidity: "85%",
    forecast: [
      { period: "mañana", min: "23", max: "27", pop: "60" },
      { period: "tarde",  min: "27", max: "30", pop: "85" },
      { period: "noche",  min: "24", max: "26", pop: "70" },
    ],
  },

  // 5) Neblina / neblina matinal
  {
    location: "Ciudad de Buenos Aires",
    temperature: "17°C",
    feelsLike: "17°C",
    condition: "Niebla",
    precipitationProb: "10%",
    windKmh: "6 km/h",
    uvIndex: "1",
    humidity: "92%",
    forecast: [
      { period: "mañana", min: "13", max: "16", pop: "10" },
      { period: "tarde",  min: "16", max: "19", pop: "15" },
      { period: "noche",  min: "15", max: "17", pop: "10" },
    ],
  },

  // 6) Viento pampero (refresca, sin lluvia)
  {
    location: "Ciudad de Buenos Aires",
    temperature: "20°C",
    feelsLike: "19°C",
    condition: "Viento",
    precipitationProb: "5%",
    windKmh: "45 km/h",
    uvIndex: "4",
    humidity: "48%",
    forecast: [
      { period: "mañana", min: "14", max: "18", pop: "5" },
      { period: "tarde",  min: "18", max: "21", pop: "5" },
      { period: "noche",  min: "13", max: "16", pop: "5" },
    ],
  },

  // 7) Calor húmedo (bochornoso, sin lluvias importantes)
  {
    location: "Ciudad de Buenos Aires",
    temperature: "33°C",
    feelsLike: "37°C",
    condition: "Parcialmente nublado",
    precipitationProb: "20%",
    windKmh: "10 km/h",
    uvIndex: "9",
    humidity: "75%",
    forecast: [
      { period: "mañana", min: "26", max: "31", pop: "15" },
      { period: "tarde",  min: "31", max: "35", pop: "20" },
      { period: "noche",  min: "27", max: "29", pop: "20" },
    ],
  },

  // 8) Frente frío (baja térmica, aire seco)
  {
    location: "Ciudad de Buenos Aires",
    temperature: "12°C",
    feelsLike: "9°C",
    condition: "Soleado",
    precipitationProb: "0%",
    windKmh: "28 km/h",
    uvIndex: "5",
    humidity: "35%",
    forecast: [
      { period: "mañana", min: "6",  max: "10" },
      { period: "tarde",  min: "10", max: "13" },
      { period: "noche",  min: "7",  max: "9"  },
    ],
  },

  // 9) Lluvia continua todo el día (poco, pero a veces pasa)
  {
    location: "Ciudad de Buenos Aires",
    temperature: "19°C",
    feelsLike: "18°C",
    condition: "Lluvia",
    precipitationProb: "70%",
    windKmh: "20 km/h",
    uvIndex: "2",
    humidity: "88%",
    forecast: [
      { period: "mañana", min: "16", max: "18", pop: "70" },
      { period: "tarde",  min: "18", max: "20", pop: "75" },
      { period: "noche",  min: "17", max: "19", pop: "65" },
    ],
  },

  // 10) Nublado con chaparrones nocturnos
  {
    location: "Ciudad de Buenos Aires",
    temperature: "23°C",
    feelsLike: "23°C",
    condition: "Nublado",
    precipitationProb: "25%",
    windKmh: "15 km/h",
    uvIndex: "3",
    humidity: "65%",
    forecast: [
      { period: "mañana", min: "19", max: "22", pop: "10" },
      { period: "tarde",  min: "22", max: "25", pop: "20" },
      { period: "noche",  min: "20", max: "22", pop: "40" },
    ],
  },

  // 11) Sudestada leve (viento + humedad alta, pop moderado)
  {
    location: "Ciudad de Buenos Aires",
    temperature: "18°C",
    feelsLike: "17°C",
    condition: "Viento",
    precipitationProb: "35%",
    windKmh: "38 km/h",
    uvIndex: "2",
    humidity: "82%",
    forecast: [
      { period: "mañana", min: "15", max: "17", pop: "25" },
      { period: "tarde",  min: "17", max: "19", pop: "35" },
      { period: "noche",  min: "16", max: "18", pop: "30" },
    ],
  },
];


export function getMockWeatherFor(arg: Date | number): RawWeatherData {
  const len = mockWeatherCases.length;

  if (typeof arg === "number") {
    return mockWeatherCases[Math.abs(arg) % len];
  }

  // usar día del año (0–365) para recorrer todos los casos
  const d = new Date(arg);
  const start = new Date(d.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((+d - +start) / 86_400_000); // ms en un día

  return mockWeatherCases[dayOfYear % len];
}
