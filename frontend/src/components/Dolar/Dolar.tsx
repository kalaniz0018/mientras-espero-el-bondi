// src/components/Dolar/Dolar.tsx
import React from "react";
import { Card } from "../UI/Card";

/** ---- Tipos ---- */
type Rate = {
  name: "Blue" | "Oficial" | (string & {});
  buy: number;   // compra
  sell: number;  // venta
  changePct?: number; // variación intradía en %, ej: +2.1 / -0.8
  href?: string;      // fuente opcional
};

type DolarProps = {
  className?: string;
  rates?: Rate[];        // si no viene, usamos mock local
  updatedAtText?: string; // ej: "actualizado hace 5 min"
};

/** ---- Helpers simples (mantener en el mismo archivo) ---- */
const formatARS = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

const roundPct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;

/** Pill de variación ↑ / ↓ (opcional) */
const ChangePill: React.FC<{ value?: number }> = ({ value }) => {
  if (value == null) return null;
  const up = value > 0;
  const color = up ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10";
  const icon = up ? "▲" : "▼";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}
      title="Variación intradía"
    >
      {icon} {roundPct(value)}
    </span>
  );
};

/** Una fila de cotización (Blue / Oficial) */
const RateRow: React.FC<{ rate: Rate; highlight?: boolean }> = ({ rate, highlight }) => {
  const Wrapper: React.ElementType = rate.href ? "a" : "div";
  const accent =
    rate.name === "Blue"
      ? "text-blue-400"
      : rate.name === "Oficial"
      ? "text-emerald-400"
      : "text-gray-300";

  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <Wrapper
        href={rate.href}
        target={rate.href ? "_blank" : undefined}
        rel={rate.href ? "noopener noreferrer" : undefined}
        className="group block rounded-md px-2 -mx-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition"
      >
        {/* Encabezado: chip + variación */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center rounded-full bg-gray-700/40 px-2 py-0.5 text-[11px] font-medium ${accent}`}
          >
            {rate.name}
          </span>
          <ChangePill value={rate.changePct} />
        </div>

        {/* Venta grande + compra chica */}
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <div>
            <div className={`leading-none ${highlight ? "text-2xl font-extrabold" : "text-xl font-bold"}`}>
              {formatARS(rate.sell)}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              <span className="opacity-80">Compra:</span> {formatARS(rate.buy)}
            </div>
          </div>

          {/* Indicador de "Venta" para claridad */}
          <span className="text-xs text-gray-400 self-end mb-0.5">Venta</span>
        </div>
      </Wrapper>
    </li>
  );
};

export const Dolar: React.FC<DolarProps> = ({ className = "", rates, updatedAtText }) => {
  // Mock por defecto (podés reemplazarlo por datos reales cuando tengas API)
  const data: Rate[] =
    rates ??
    [
      { name: "Blue", buy: 1300, sell: 1320, changePct: +2.13, href: "https://dolarito.ar" },
      { name: "Oficial", buy: 880, sell: 900, changePct: -0.37, href: "https://dolarito.ar" },
    ];

  const blue = data.find((r) => r.name.toLowerCase() === "blue");
  const oficial = data.find((r) => r.name.toLowerCase() === "oficial");

  const brecha =
    blue && oficial ? Math.round(((blue.sell - oficial.sell) / oficial.sell) * 100) : null;

  return (
    <div className={className}>
      <Card title="Cotización del Dólar" icon="💵">
        {/* Texto de actualización (opcional) */}
        {updatedAtText && (
          <div className="mb-2 text-xs text-gray-400">{updatedAtText}</div>
        )}

        {/* Lista de tasas (Blue destacado arriba) */}
        <ul className="divide-y divide-gray-200/10 dark:divide-gray-700/40">
          {blue && <RateRow rate={blue} highlight />}
          {oficial && <RateRow rate={oficial} />}
          {/* Si mañana querés agregar MEP/CCL, simplemente pusheás más RateRow acá */}
        </ul>

        {/* Brecha (si aplica) */}
        {brecha != null && (
          <div className="mt-3 text-sm text-gray-300">
            <span className="opacity-80">Brecha Blue vs Oficial:</span>{" "}
            <span className={brecha >= 30 ? "text-amber-400" : "text-gray-100"}>
              {brecha}%
            </span>
          </div>
        )}
      </Card>
    </div>
  );
};
