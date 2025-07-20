import React from "react";

export const Clock: React.FC = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow h-full  min-h-[100px] overflow-auto">
      <h2 className="text-xl font-bold mb-2">📅 Fecha</h2>
      <p>{dateStr}</p>
    </div>
  );
};
