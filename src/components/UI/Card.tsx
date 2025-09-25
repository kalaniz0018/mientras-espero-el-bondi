import React from "react";

type CardProps = {
  title: string;
  icon?: string;
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white 
                    p-4 rounded-xl shadow h-full min-h-[100px] 
                    transition hover:shadow-lg hover:-translate-y-0.5">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        {icon && <span className="text-xl">{icon}</span>}
        {title}
      </h2>
      {children}
    </div>
  );
};
