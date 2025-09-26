import React from "react";
import { Card } from "../UI/Card";
import { mockFeriado } from "../../mocks/mockData";

import { pickFeriadoIcon } from "./FeriadoIcons";
import { buildFeriadoMessage, buildFeriadoTitle } from "./FeriadoMessages";
import { getNextFeriadoData } from "./FeriadoLogic";
import { atMidnight, formatLargo } from "./FeriadoDate";

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

  // Héroe (número o banner)
  const heroNumber = isOngoing ? daysToEnd : Math.max(1, daysToStart);
  const heroUnit =
    heroNumber === 1 ? (isOngoing ? "día de feriado" : "día") : (isOngoing ? "días de feriado" : "días");

  const icon = pickFeriadoIcon(next.name, next.start);
  const cardTitle = buildFeriadoTitle({ isOngoing, isStartToday, name: next.name });
  const subMessage = buildFeriadoMessage({
    isOngoing,
    isStartToday,
    isLastDay,
    name: next.name,
    durationDays,
  });

  // Si el título ya muestra el nombre (hoy o en curso), evitamos repetirlo en chips
  const titleShowsName = /¡Hoy es|🎉/.test(cardTitle);
  const showNameChip = !titleShowsName; // sólo cuando el título es “Próximo feriado”

  return (
    <div className={className}>
      <Card title={cardTitle} icon={icon}>
        {/* HERO */}
        {isOngoing && isStartToday ? (
          // Día 1: banner festivo, SIN repetir el nombre (ya está en el título)
          <div className="mb-3 rounded-lg p-3 bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-600/30">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <span>🎉</span>
              <span>¡Es hoy!</span>
            </div>
            {hasMultipleDays && (
              <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-1">
                {durationDays} {durationDays === 1 ? "día" : "días"}
              </p>
            )}
          </div>
        ) : isOngoing ? (
          // En curso (no día 1): número grande restante
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
          // Futuro: countdown
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-5xl sm:text-6xl font-extrabold leading-none tracking-tight">
              {heroNumber}
            </span>
            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {heroUnit} {heroNumber === 1 ? "restante" : "restantes"}
            </span>
          </div>
        )}

        {/* Chips útiles (sin repetir el nombre si ya está en el título) */}
        <div className="flex items-center gap-2 mb-2">
          {showNameChip && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
              {next.name}
            </span>
          )}
          {hasMultipleDays && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200">
              finde largo
            </span>
          )}
        </div>

        {/* Mensaje humano/contextual */}
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
