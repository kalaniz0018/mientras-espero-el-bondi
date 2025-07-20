import React from "react";
import { mockFeriado } from "../mocks/mockData";

export const NextFeriado: React.FC = () => {
  const today = new Date();
  const feriadoDate = new Date(mockFeriado.date);

  const diffInTime = feriadoDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffInTime / (1000 * 3600 * 24));

  return (
    <div className="bg-white p-4 rounded-xl shadow h-full min-h-[100px]">
      <h2 className="text-xl font-bold mb-2">🇦🇷 Próximo Feriado</h2>
      <p className="font-semibold">{mockFeriado.name}</p>
      <p>{feriadoDate.toLocaleDateString("es-AR")}</p>
      <p className="text-sm text-gray-600">{daysLeft} días restantes</p>
    </div>
  );
};
