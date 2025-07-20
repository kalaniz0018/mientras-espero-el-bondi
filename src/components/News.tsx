import React from "react";
import { mockNews } from "../mocks/mockData";

type NewsProps = {
  className?: string;
};

export const News: React.FC<NewsProps> = ({ className = "" }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 text-black dark:text-white bg-white p-4 rounded-xl shadow max-h-64 overflow-auto ${className}`}>
      <h2 className="text-xl font-bold mb-2">📰 Noticias</h2>
      <ul className="space-y-2">
        {mockNews.map((item, idx) => (
          <li key={idx} className="border-b pb-1">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-500 bg-white dark:bg-gray-800 text-black dark:text-white ">{item.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
