import React from "react";
import { Card } from "../UI/Card";
import { mockFeriado } from "../../mocks/mockData";

import { pickFeriadoIcon } from "./feriado_icons";
import { buildFeriadoMessage, buildFeriadoTitle } from "./feriado_messages";
import { getNextFeriadoData } from "./feriado_logic";
import { atMidnight, formatLargo } from "./feriado_date";

type NextFeriadoProps = {
  className?: string;
};

export const NextFeriado: React.FC<NextFeriadoProps> = ({ className = "" }) => {
  const today = atMidnight(new Date());

  const data = getNextFeriadoData(mockFeriado, today);
  if (!data) return null;

  const {
    next,
    isOngoing,
    isStartToday,
    isLastDay,
    durationDays,
    hasMultipleDays,
    daysToStart,
    daysToEnd,
  } = data;

  // “héroe”: número grande o banner “¡Es hoy!”
  const heroNumber = isOngoing ? daysToEnd : Math.max(1, daysToStart);
  const heroUnit =
    heroNumber === 1
      ? isOngoing
        ? "día de feriado"
        : "día"
      : isOngoing
      ? "días de feriado"
      : "días";

  const icon = pickFeriadoIcon(next.name, next.start);
  const cardTitle = buildFeriadoTitle({ isOngoing, isStartToday, name: next.name });
  const subMessage = buildFeriadoMessage({
    isOngoing,
    isStartToday,
    isLastDay,
    name: next.name,
    durationDays,
  });

  return (
    <div className={className}>
      <Card title={cardTitle} icon={icon}>
        {/* HERO */}
        {isOngoing && isStartToday ? (
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
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-5xl sm:text-6xl font-extrabold leading-none tracking-tight">
              {heroNumber}
            </span>
            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {heroUnit} {heroNumber === 1 ? "restante" : "restantes"}
            </span>
          </div>
        )}

        {/* Etiqueta del feriado */}
        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 mb-2">
          {next.name}
          {hasMultipleDays && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200">
              finde largo
            </span>
          )}
        </div>

        {/* Mensaje contextual corto (humano) */}
        {subMessage && (
          <p className="text-emerald-600 dark:text-emerald-400 text-sm mb-2">
            {subMessage}
          </p>
        )}

        {/* Fecha o rango */}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {hasMultipleDays
            ? `${formatLargo(next.start)} – ${formatLargo(next.end)} (${durationDays} ${
                durationDays === 1 ? "día" : "días"
              })`
            : formatLargo(next.start)}
        </p>
      </Card>
    </div>
  );
};

export default NextFeriado;
