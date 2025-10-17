import React from "react";
import { Card } from "../UI/Card";

type Props = {
  className?: string;
};

export const Recordatorio: React.FC<Props> = ({ className = "" }) => {
  return (
    <div className={className}>
      <Card title="Recordatorio" icon="📌">
        <div className="text-sm text-gray-400">No hay recordatorios aún</div>
      </Card>
    </div>
  );
};
