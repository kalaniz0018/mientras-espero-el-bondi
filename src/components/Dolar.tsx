import React from "react";
import { Card } from "./UI/Card";

export const Dolar: React.FC = () => {
  const blue = { tipo: "Blue", compra: 1300, venta: 1320 };
  const oficial = { tipo: "Oficial", compra: 880, venta: 900 };

  return (
    <Card title="Cotización del Dólar" icon="💵">
      <div className="mb-3">
        <h3 className="font-semibold text-blue-700">Dólar Blue</h3>
        <p className="text-sm">
          Compra: ${blue.compra} | Venta: ${blue.venta}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-green-700">Dólar Oficial</h3>
        <p className="text-sm">
          Compra: ${oficial.compra} | Venta: ${oficial.venta}
        </p>
      </div>
    </Card>
  );
};
