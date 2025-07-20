import React from "react";

export const Dolar: React.FC = () => {
  const blue = { tipo: "Blue", compra: 1300, venta: 1320 };
  const oficial = { tipo: "Oficial", compra: 880, venta: 900 };

  return (
    <div className="bg-white p-4 rounded-xl shadow h-full min-h-[100px] bg-white dark:bg-gray-800 text-black dark:text-white">
      <h2 className="text-xl font-bold mb-4">💵 Cotización del Dólar</h2>

      <div className="mb-3">
        <h3 className="font-semibold text-blue-700">Dólar Blue</h3>
        <p className="text-sm text-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white ">
          Compra: ${blue.compra} | Venta: ${blue.venta}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-green-700">Dólar Oficial</h3>
        <p className="text-sm text-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white ">
          Compra: ${oficial.compra} | Venta: ${oficial.venta}
        </p>
      </div>
    </div>
  );
};
