import React from "react";
import { mockHoroscopo } from "../../mocks/mockData";
import { Card } from "../UI/Card";

type HoroscopoProps = {
  className?: string;
};

export const Horoscopo: React.FC<HoroscopoProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <Card title="Horóscopo del Día" icon="🔮">
        <p className="font-semibold mb-1">{mockHoroscopo.signo}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {mockHoroscopo.mensaje}
        </p>
      </Card>
    </div>
  );
};
