import React from "react";
import { mockEfemerides } from "../mocks/mockData";
import { Card } from "./UI/Card";

type EfemeridesProps = {
  className?: string;
};

export const Efemerides: React.FC<EfemeridesProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <Card title="Efemérides" icon="📚">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {mockEfemerides.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
