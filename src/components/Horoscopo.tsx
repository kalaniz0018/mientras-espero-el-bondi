import React from "react";
import { mockHoroscopo } from "../mocks/mockData"; // ✅ Import del mock

export const Horoscopo: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl shadow h-full min-h-[100px]">
      <h2 className="text-xl font-bold mb-2">🔮 Horóscopo del Día</h2>
      <p className="font-semibold mb-1">{mockHoroscopo.signo}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {mockHoroscopo.mensaje}
      </p>
    </div>
  );
};
