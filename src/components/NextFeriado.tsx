import React from "react";
import { mockFeriado } from "../mocks/mockData";
import { Card } from "./UI/Card";

type NextFeriadoProps = {
  className?: string;
};

export const NextFeriado: React.FC<NextFeriadoProps> = ({ className = "" }) => {
  const today = new Date();
  const feriadoDate = new Date(mockFeriado.date);

  const diffInTime = feriadoDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffInTime / (1000 * 3600 * 24));

  return (
    <div className={className}>
      <Card title="Próximo Feriado" icon="🇦🇷">
        <p className="font-semibold">{mockFeriado.name}</p>
        <p>{feriadoDate.toLocaleDateString("es-AR")}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {daysLeft} días restantes
        </p>
      </Card>
    </div>
  );
};
