import React from "react";
import { mockFeriado } from "../mocks/mockData"; // Array de feriados
import { Card } from "./UI/Card";

type NextFeriadoProps = {
  className?: string;
};

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

export const NextFeriado: React.FC<NextFeriadoProps> = ({ className = "" }) => {
  const today = atMidnight(new Date());

  const normalized = mockFeriado
    .map((f) => {
      const start = atMidnight(parseLocalDate(f.startDate));
      const end = atMidnight(parseLocalDate(f.endDate ?? f.startDate));
      return { ...f, start, end };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());

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

  if (!isOngoing && daysBetween(today, next.start) === 0) {
    // buscamos el siguiente a este
    const idx = normalized.findIndex(
      (f) => f.start.getTime() === next!.start.getTime()
    );
    const candidate = normalized[idx + 1] ?? {
      ...normalized[0],
      start: addOneYear(normalized[0].start),
      end: addOneYear(normalized[0].end),
    };
    next = candidate;
  }

  const durationDays = daysBetween(next.start, next.end) + 1;
  const hasMultipleDays = durationDays > 1;

  const daysToStart = Math.max(0, daysBetween(today, next.start));
  const daysToEnd = Math.max(0, daysBetween(today, next.end)) + 1;

  const heroNumber = isOngoing ? daysToEnd : Math.max(1, daysToStart);
  const heroUnit =
    heroNumber === 1
      ? isOngoing
        ? "día de feriado"
        : "día"
      : isOngoing
      ? "días de feriado"
      : "días";

  return (
    <div className={className}>
      <Card title="Próximo Feriado" icon="🇦🇷">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-5xl sm:text-6xl font-extrabold leading-none tracking-tight">
            {heroNumber}
          </span>
          <span
            className={`text-sm sm:text-base ${
              isOngoing
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {heroUnit} {heroNumber === 1 ? "restante" : "restantes"}
          </span>
        </div>

        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 mb-2">
          {next.name}
          {hasMultipleDays && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200">
              finde largo
            </span>
          )}
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          {hasMultipleDays
            ? `${formatDate(next.start)} – ${formatDate(
                next.end
              )} (${durationDays} ${durationDays === 1 ? "día" : "días"})`
            : formatDate(next.start)}
        </p>

        {isOngoing && (
          <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
            En curso · {durationDays} {durationDays === 1 ? "día" : "días"} de
            feriado
          </p>
        )}
      </Card>
    </div>
  );
};
