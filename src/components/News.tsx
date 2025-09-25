import React from "react";
import { mockNews } from "../mocks/mockData";
import { Card } from "./UI/Card";

type NewsProps = {
  className?: string;
};

export const News: React.FC<NewsProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <Card title="Noticias" icon="📰">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-64 overflow-auto">
          {mockNews.map((item, idx) => (
            <li key={idx} className="py-2">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">{item.source}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
