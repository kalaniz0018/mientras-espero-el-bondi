import React from "react";
import GridLayout from "react-grid-layout";
import { Clock } from "../components/Clock";
import { Weather } from "../components/Weather";
import { News } from "../components/News";
import { Efemerides } from "../components/Efemerides";
import { NextFeriado } from "../components/NextFeriado";

export const DashboardLayout: React.FC = () => {
  const layout = [
    { i: "clock", x: 0, y: 0, w: 3, h: 1 },
    { i: "weather", x: 3, y: 0, w: 3, h: 2 },
    { i: "news", x: 0, y: 2, w: 6, h: 2 },
    { i: "efemerides", x: 6, y: 0, w: 6, h: 2 },
    { i: "feriado", x: 6, y: 2, w: 6, h: 1 },
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={60}
      width={1200}
      isResizable={true}
      isDraggable={true}
    >
      <div key="clock">
        <Clock />
      </div>
      <div key="weather">
        <Weather />
      </div>
      <div key="news">
        <News />
      </div>
      <div key="efemerides">
        <Efemerides />
      </div>
      <div key="feriado">
        <NextFeriado />
      </div>
    </GridLayout>
  );
};
