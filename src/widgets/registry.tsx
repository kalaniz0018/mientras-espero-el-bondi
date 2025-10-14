// src/widgets/registry.ts
import { Weather } from "../components/Weather/Weather";
import { News } from "../components/News/News";
import { NextFeriado } from "../components/NextFeriado/NextFeriado";
import { Dolar } from "../components/Dolar/Dolar";
import { Descuentos } from "../components/Descuentos/Descuentos";
import { Efemerides } from "../components/Efemerides/Efemerides";
import { Horoscopo } from "../components/Horoscopo/Horoscopo";
import { Recordatorio } from "../components/Recordatorio/Recordatorio";

// Tipos
export type WidgetId =
  | "clima"
  | "dolar"
  | "news"
  | "feriado"
  | "descuentos"
  | "efemerides"
  | "horoscopo"
  | "recordatorio";

export type WidgetDef = {
  id: WidgetId;
  label: string;
  component: React.FC<{ className?: string }>;
  defaults?: { visible: boolean };
};

// Registro único de widgets
export const WIDGETS: WidgetDef[] = [
  { id: "dolar", label: "Cotización del Dólar", component: Dolar },
  { id: "feriado", label: "Próximo Feriado", component: NextFeriado },
  { id: "horoscopo", label: "Horóscopo", component: Horoscopo },
  { id: "clima", label: "Clima", component: Weather },
  { id: "news", label: "Noticias", component: News },
  { id: "descuentos", label: "Descuentos", component: Descuentos },
  { id: "recordatorio", label: "Recordatorio", component: Recordatorio },
  { id: "efemerides", label: "Efemérides", component: Efemerides },
];
