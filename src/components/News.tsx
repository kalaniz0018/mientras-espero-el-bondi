import React from "react";
import { mockNews } from "../mocks/mockData";

export const News: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow max-h-64 overflow-auto">
      <h2 className="text-xl font-bold mb-2">📰 Noticias</h2>
      <ul className="space-y-2">
        {mockNews.map((item, idx) => (
          <li key={idx} className="border-b pb-1  h-full">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-500">{item.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
