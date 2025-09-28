// src/components/Efemerides.tsx
import React from "react";
import { Card } from "../UI/Card";
import { mockEfemerides } from "../../mocks/mockData";

type EfemeridesProps = {
  className?: string;
  limit?: number; // por defecto 3
};

// "YYYY: texto" -> { year, text }
function parseEfemeride(raw: string): { year: number; text: string } | null {
  const m = raw.match(/^(\d{3,4})\s*:\s*(.+)$/);
  if (!m) return null;
  return { year: Number(m[1]), text: m[2].trim() };
}

export const Efemerides: React.FC<EfemeridesProps> = ({
  className = "",
  limit = 3,
}) => {
  const items = mockEfemerides
    .map(parseEfemeride)
    .filter((x): x is { year: number; text: string } => Boolean(x))
    .sort((a, b) => a.year - b.year);

  const visible = items.slice(0, limit);

  return (
    <div className={className}>
      <Card title="Efemérides" icon="📚">
        <span className="inline-block rounded-full bg-gray-700/30 text-[11px] font-medium text-emerald-300 px-2 py-0.5 mb-3">
          Lo que pasó un día como hoy 
        </span>

        {/* si querés un subtítulo corto y neutro, descomentá: */}
        {/* <p className="text-xs text-gray-400 mb-2">Efemérides de hoy</p> */}

        {visible.length === 0 ? (
          <div className="text-sm text-gray-400 py-6 px-2">
            No hay efemérides para mostrar por ahora.
          </div>
        ) : (
          <ul className="text-sm">
            {visible.map((item, idx) => (
              <li
                key={`${item.year}-${idx}`}
                className="py-2 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-3 rounded-md px-2 hover:bg-white/5 transition">
                  {/* Año: chip con ancho fijo y números tabulares */}
                  <span className="shrink-0 inline-flex items-center justify-center rounded-full bg-gray-700/40 text-gray-100 px-2 py-0.5 text-[11px] font-semibold tabular-nums w-12 text-center">
                    {item.year}
                  </span>

                  {/* Texto plano (sin resaltados) */}
                  <p className="text-gray-200 leading-relaxed break-words">
                    {item.text}
                  </p>
                </div>

                {idx < visible.length - 1 && (
                  <div className="mt-2 h-px bg-gray-700/20" />
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};
