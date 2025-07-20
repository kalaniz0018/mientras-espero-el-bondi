import React from "react";

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
    <div className={`bg-white p-4 rounded-xl shadow h-full min-h-[100px] ${className}`}>
      <h2 className="text-xl font-bold mb-2">📅 Fecha</h2>
      <p>{dateStr}</p>
    </div>
  );
};
