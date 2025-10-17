import React from "react";
import { Card } from "./UI/Card";

type ClockProps = {
  className?: string;
};

export const Clock: React.FC<ClockProps> = ({ className = "" }) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={className}>
      <Card title="Fecha" icon="📅">
        <p className="text-base">{dateStr}</p>
      </Card>
    </div>
  );
};
