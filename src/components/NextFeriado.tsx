import React from "react";
import { mockFeriado } from "../mocks/mockData";

type NextFeriadoProps = {
  className?: string;
};

export const NextFeriado: React.FC<NextFeriadoProps> = ({ className = "" }) => {
  const today = new Date();
  const feriadoDate = new Date(mockFeriado.date);

  const diffInTime = feriadoDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffInTime / (1000 * 3600 * 24));

  return (
    <div className={` bg-white dark:bg-gray-800 text-black dark:text-white bg-white p-4 rounded-xl shadow h-full min-h-[100px] ${className}`}>
      <h2 className="text-xl font-bold mb-2">🇦🇷 Próximo Feriado</h2>
      <p className="font-semibold">{mockFeriado.name}</p>
      <p>{feriadoDate.toLocaleDateString("es-AR")}</p>
      <p className="text-sm text-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white ">{daysLeft} días restantes</p>
    </div>
  );
};
