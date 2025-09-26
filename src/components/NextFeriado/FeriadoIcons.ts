// Íconos por palabra clave + estaciones

import { atMidnight } from "./FeriadoDate";

const ICON_KEYWORDS: Array<[RegExp, string]> = [
  [/bandera/i, ""],
  [/carnaval/i, "🎭"],
  [/malvinas|veteranos/i, "🎖️"],
  [/independencia/i, "🎆"],
  [/revolución de mayo/i, ""],
  [/trabajo/i, "🛠️"],
  [/san mart[ií]n/i, "🫡"],
  [/diversidad cultural|raza/i, "🌎"],
  [/soberan[ií]a/i, "⚓"],
  [/navidad/i, "🎄"],
  [/año nuevo/i, "🎆"],
  [/pascua|semana santa/i, "🐣"],
];

const SEASONS = [
  { m: 3, d: 20, icon: "🍂" },  // otoño aprox.
  { m: 6, d: 21, icon: "❄️" },  // invierno 2025
  { m: 9, d: 22, icon: "🌸" },  // primavera
  { m: 12, d: 21, icon: "☀️" }, // verano
];

const withinDays = (a: Date, b: Date, tolDays = 1) =>
  Math.abs(atMidnight(a).getTime() - atMidnight(b).getTime()) <= tolDays * 86400000;

export const pickFeriadoIcon = (name: string, date: Date): string => {
  const n = name.toLowerCase();

  for (const [rx, emoji] of ICON_KEYWORDS) {
    if (rx.test(n)) return emoji;
  }
  if (n.includes("verano")) return "☀️";
  if (n.includes("invierno")) return "❄️";
  if (n.includes("primavera")) return "🌸";
  if (n.includes("otoño") || n.includes("otono")) return "🍂";

  // cerca del inicio de estación
  const y = date.getFullYear();
  for (const s of SEASONS) {
    const estimate = new Date(y, s.m - 1, s.d);
    if (withinDays(date, estimate)) return s.icon;
  }

  return "✨";
};
