import React from "react";
import GridLayout from "react-grid-layout";
import { Clock } from "../components/Clock";
import { Weather } from "../components/Weather";
import { News } from "../components/News";
import { Efemerides } from "../components/Efemerides";
import { NextFeriado } from "../components/NextFeriado";

export const DashboardLayout: React.FC = () => {
  return (
    <GridLayout
      className="layout"
      cols={12}
      rowHeight={60}
      width={1200}
      isResizable={false}
      isDraggable={true}
      compactType="vertical"
    >
      <div key="clock" data-grid={{ x: 0, y: 0, w: 3, h: 1 }}>
        <Clock />
      </div>
      <div key="weather" data-grid={{ x: 3, y: 0, w: 3, h: 2 }}>
        <Weather />
      </div>
      <div key="news" data-grid={{ x: 0, y: 2, w: 4, h: 2 }}>
        <News />
      </div>
      <div key="efemerides" data-grid={{ x: 6, y: 0, w: 4, h: 2 }}>
        <Efemerides />
      </div>
      <div key="feriado" data-grid={{ x: 6, y: 2, w: 4, h: 2 }}>
        <NextFeriado />
      </div>
    </GridLayout>
  );
};
