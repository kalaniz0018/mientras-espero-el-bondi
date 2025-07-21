import React from "react";
import { mockDescuentos } from "../mocks/mockData";

type DescuentosProps = {
  className?: string;
};

export const Descuentos: React.FC<DescuentosProps> = ({ className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl shadow h-full min-h-[100px] ${className}`}>
      <h2 className="text-xl font-bold mb-2">🛒 Descuentos del Día</h2>
      <ul className="space-y-2 text-sm">
        {mockDescuentos.map((item, idx) => (
          <li key={idx}>
            <span className="font-semibold">{item.supermercado}:</span>{" "}
            {item.promo}
          </li>
        ))}
      </ul>
    </div>
  );
};
