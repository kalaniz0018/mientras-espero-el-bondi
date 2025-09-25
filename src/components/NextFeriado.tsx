import React from "react";
import { mockFeriado } from "../mocks/mockData";
import { Card } from "./UI/Card";

type NextFeriadoProps = {
  className?: string;
};

export const NextFeriado: React.FC<NextFeriadoProps> = ({ className = "" }) => {
  const now = new Date();
  const feriadoDate = new Date(mockFeriado.date);

  // Diferencia en días (redondeando hacia arriba para contar el día parcial)
  const diffMs = feriadoDate.getTime() - now.getTime();
  const rawDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, rawDays); // nunca negativo

  const formatDate = (d: Date) =>
    d.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const isToday = daysLeft === 0;
  const unit = daysLeft === 1 ? "día" : "días";

  return (
    <div className={className}>
      <Card title="Próximo Feriado" icon="🇦🇷">
        {/* Héroe: días restantes bien grandes */}
        <div className="flex items-baseline gap-3 mb-3">
          {isToday ? (
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              ¡Hoy!
            </span>
          ) : (
            <>
              <span className="text-5xl sm:text-6xl font-extrabold leading-none tracking-tight">
                {daysLeft}
              </span>
              <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                {unit} restantes
              </span>
            </>
          )}
        </div>

        {/* Nombre del feriado como “pill” para dar personalidad */}
        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 mb-2">
          {mockFeriado.name}
        </div>

        {/* Fecha completa, secundaria */}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {formatDate(feriadoDate)}
        </p>

        {/* Hint sutil si es hoy */}
        {isToday && (
          <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
            A disfrutar el día libre ✨
          </p>
        )}
      </Card>
    </div>
  );
};
