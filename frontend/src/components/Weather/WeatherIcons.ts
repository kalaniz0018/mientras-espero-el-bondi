// src/components/Weather/WeatherIcons.ts
export const pickWeatherIcon = (condition: string): string => {
  const n = condition.toLowerCase();

  if (/tormenta|storm|thunder/i.test(n)) return "⛈️";
  if (/lluvia|rain/i.test(n)) return "🌧️";
  if (/nieve|snow/i.test(n)) return "❄️";
  if (/nublado|cloud/i.test(n)) return "☁️";
  if (/parcial|partly/i.test(n)) return "🌤️";
  if (/soleado|sun/i.test(n)) return "☀️";
  if (/viento|wind/i.test(n)) return "💨";
  if (/niebla|fog/i.test(n)) return "🌫️";

  return "✨"; // fallback por si no matchea nada
};
