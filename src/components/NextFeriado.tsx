import React from "react";
import { mockFeriado } from "../mocks/mockData";
import { Card } from "./UI/Card";

// ====== helpers de fechas ======
const atMidnight = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

const daysBetween = (a: Date, b: Date) =>
  Math.round(
    (atMidnight(b).getTime() - atMidnight(a).getTime()) / (1000 * 60 * 60 * 24)
  );

const formatDate = (d: Date) =>
  d.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

const parseLocalDate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const addOneYear = (d: Date) =>
  new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());

// ====== helpers de íconos ======
const ICON_KEYWORDS: Array<[RegExp, string]> = [
  [/bandera/i, "🇦🇷"],
  [/carnaval/i, "🎭"],
  [/malvinas|veteranos/i, "🎖️"],
  [/independencia/i, "🎆"],
  [/revolución de mayo/i, "🇦🇷"],
  [/trabajo/i, "🛠️"],
  [/san mart[ií]n/i, "🫡"],
  [/diversidad cultural|raza/i, "🌎"],
  [/soberan[ií]a/i, "⚓"],
  [/navidad/i, "🎄"],
  [/año nuevo/i, "🎆"],
  [/pascua|semana santa/i, "🐣"],
];

const SEASONS = [
  { m: 3, d: 20, icon: "🍂" },
  { m: 6, d: 21, icon: "❄️" }, // inv 2025: 21/06
  { m: 9, d: 22, icon: "🌸" },
  { m: 12, d: 21, icon: "☀️" },
];

const WITHIN_DAYS = (a: Date, b: Date, tolerance = 1) =>
  Math.abs(atMidnight(a).getTime() - atMidnight(b).getTime()) <=
  tolerance * 24 * 60 * 60 * 1000;

const pickIcon = (name: string, date: Date): string => {
  const n = name.toLowerCase();
  for (const [rx, emoji] of ICON_KEYWORDS) if (rx.test(n)) return emoji;
  if (n.includes("verano")) return "☀️";
  if (n.includes("invierno")) return "❄️";
  if (n.includes("primavera")) return "🌸";
  if (n.includes("otoño") || n.includes("otono")) return "🍂";
  const y = date.getFullYear();
  for (const s of SEASONS) {
    const guess = new Date(y, s.m - 1, s.d);
    if (WITHIN_DAYS(date, guess)) return s.icon;
  }
  return "✨";
};

// ====== componente ======
type NextFeriadoProps = { className?: string };

export const NextFeriado: React.FC<NextFeriadoProps> = ({ className = "" }) => {
  const today = atMidnight(new Date());
  // Normalizamos + ordenamos
  const normalized = mockFeriado
    .map((f) => {
      const start = atMidnight(parseLocalDate(f.startDate));
      const end = atMidnight(parseLocalDate(f.endDate ?? f.startDate));
      return { ...f, start, end };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  // Próximo feriado >= hoy; si ninguno, roll al año siguiente
  let next = normalized.find((f) => f.start.getTime() >= today.getTime());
  if (!next) {
    const rolled = normalized
      .map((f) => ({
        ...f,
        start: addOneYear(f.start),
        end: addOneYear(f.end),
      }))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
    next = rolled[0];
  }
  if (!next) return null;

  const isOngoing =
    today.getTime() >= next.start.getTime() &&
    today.getTime() <= next.end.getTime();

  const isStartToday = today.getTime() === next.start.getTime();

  const isLastDay = today.getTime() === next.end.getTime();
  const durationDays = daysBetween(next.start, next.end) + 1;
  const hasMultipleDays = durationDays > 1;

  const daysToStart = Math.max(0, daysBetween(today, next.start));
  const daysToEnd = Math.max(0, daysBetween(today, next.end)) + 1;

  // Si está en curso: cuántos días de feriado quedan (incluye hoy)
  // Si aún no empezó: cuántos días faltan
  const heroNumber = isOngoing ? daysToEnd : Math.max(1, daysToStart);
  const heroUnit =
    heroNumber === 1
      ? isOngoing
        ? "día de feriado"
        : "día"
      : isOngoing
      ? "días de feriado"
      : "días";

  const cardIcon = pickIcon(next.name, next.start);

  return (
    <div className={className}>
      <Card title="Próximo Feriado" icon={cardIcon}>
        {/* HERO */}
        {isOngoing && isStartToday ? (
          // 🎉 Primer día del feriado (no mostrar números)
          <div className="mb-3 rounded-lg p-3 bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-600/30">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <span>🎉</span>
              <span>¡Es hoy!</span>
            </div>
            <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-1">
              {next.name}
              {hasMultipleDays ? ` · ${durationDays} días` : ""}
            </p>
          </div>
        ) : isOngoing ? (
          // Feriado en curso (no es el primer día)
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-5xl sm:text-6xl font-extrabold leading-none tracking-tight">
              {daysToEnd}
            </span>
            <span className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400">
              {isLastDay
                ? "último día de feriado"
                : daysToEnd === 1
                ? "día de feriado restante"
                : "días de feriado restantes"}
            </span>
          </div>
        ) : (
          // Aún no empezó
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-5xl sm:text-6xl font-extrabold leading-none tracking-tight">
              {heroNumber}
            </span>
            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {heroUnit} {heroNumber === 1 ? "restante" : "restantes"}
            </span>
          </div>
        )}

        {/* Nombre del feriado como pill */}
        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 mb-2">
          {next.name}
          {hasMultipleDays && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200">
              finde largo
            </span>
          )}
        </div>

        {/* Fecha / rango */}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {hasMultipleDays
            ? `${formatDate(next.start)} – ${formatDate(
                next.end
              )} (${durationDays} ${durationDays === 1 ? "día" : "días"})`
            : formatDate(next.start)}
        </p>

        {/* Pie contextual si está en curso y no es el primer día */}
        {isOngoing && !isStartToday && (
          <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
            En curso · {durationDays} {durationDays === 1 ? "día" : "días"} de
            feriado
          </p>
        )}
      </Card>
    </div>
  );
};
