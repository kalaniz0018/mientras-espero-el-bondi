import React from "react";
import { mockEfemerides } from "../mocks/mockData";

export const Efemerides: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow h-full  min-h-[100px] ">
      <h2 className="text-xl font-bold mb-2">📚 Efemérides</h2>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {mockEfemerides.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
