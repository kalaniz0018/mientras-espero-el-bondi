import React from "react";
import { mockDescuentos } from "../mocks/mockData";
import { Card } from "./UI/Card";

type DescuentosProps = {
  className?: string;
};

export const Descuentos: React.FC<DescuentosProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <Card title="Descuentos del Día" icon="🛒">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          {mockDescuentos.map((item, idx) => (
            <li key={idx} className="py-2">
              <span className="font-semibold">{item.supermercado}:</span>{" "}
              {item.promo}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
