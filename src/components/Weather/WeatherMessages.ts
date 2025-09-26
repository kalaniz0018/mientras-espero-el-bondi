// src/components/Weather/WeatherMessages.ts
import type { WeatherData } from "./WeatherTypes";

export const buildWeatherMessage = (w: WeatherData): string => {
  const { condition, temperature, feelsLike, uvIndex, windKmh, humidity, precipitationProb, forecast } = w;

  // Señal de lluvia fuerte hoy (sin repetir el forecast visual)
  const highRainChance =
    (typeof precipitationProb === "number" && precipitationProb >= 60) ||
    (forecast?.some(f => typeof f.pop === "number" && f.pop >= 60) ?? false);

  if (/tormenta|thunder|electrica/i.test(condition)) return "⚡ Mejor moverte con cuidado: hay tormenta.";
  if (/lluvia|rain/i.test(condition) || highRainChance) return "☔ Llevá paraguas por si acaso.";
  if (/nieve|snow/i.test(condition)) return "❄️ Abrigate bien, va a estar helado.";
  if (/niebla|fog/i.test(condition)) return "🌫️ Manejá con cuidado, hay niebla.";
  if (/viento|wind/i.test(condition) || (typeof windKmh === "number" && windKmh >= 30)) return "💨 Día ventoso: cerrá bien la campera.";

  if (/soleado|sun/i.test(condition) && typeof uvIndex === "number" && uvIndex >= 7) {
    return "UV alto: usá protector y buscá sombra.";
  }
  if (typeof temperature === "number" && temperature >= 30) return "🌞 Hidratate y buscá lugares frescos.";
  if (typeof temperature === "number" && temperature <= 10) return "🧥 Salí abrigado, está fresco.";
  if (typeof humidity === "number" && humidity >= 80) return "💧 Día húmedo: llevá algo liviano y respirable.";

  if (
    typeof feelsLike === "number" &&
    typeof temperature === "number" &&
    Math.abs(feelsLike - temperature) >= 3
  ) {
    return `🌡️ Se siente como ${Math.round(feelsLike)}°C.`;
  }

  return ""; // sin mensaje cuando no hay nada útil que decir
};
