import React, { useState } from "react";
import { Card } from "../UI/Card";
import { mockDescuentos, type Descuento } from "../../mocks/mockDescuentos";

type Props = { className?: string };

/**
 * Card principal: lista resumida de descuentos del día.
 * Cada ítem abre un modal con toda la info (bancos, tope, condiciones, etc.).
 */
export const Descuentos: React.FC<Props> = ({ className = "" }) => {
  const [open, setOpen] = useState<Descuento | null>(null);

  return (
    <div className={className}>
      <Card title="Descuentos del Día" icon="🛒">
        <ul className="text-sm">
          {mockDescuentos.map((d, idx) => (
            <li key={d.id} className="py-2 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3 rounded-md px-2 py-2 hover:bg-white/5 transition">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-100">{d.comercio}</p>
                  <p className="text-gray-300">{d.resumen}</p>
                </div>

                <button
                  onClick={() => setOpen(d)}
                  className="text-emerald-300 text-xs whitespace-nowrap hover:underline ml-2"
                  aria-label={`Ver detalle de ${d.comercio}`}
                >
                  Ver más
                </button>
              </div>

              {idx < mockDescuentos.length - 1 && (
                <div className="mt-2 h-px bg-gray-700/20" />
              )}
            </li>
          ))}
        </ul>

        {/* Modal de detalle */}
        {open && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
          >
            <div
              className="w-full max-w-lg rounded-2xl bg-gray-900 border border-white/10 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{open.comercio}</h3>
                  <p className="text-sm text-emerald-300">{open.titulo}</p>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  className="text-gray-400 hover:text-gray-200 text-sm"
                >
                  Cerrar
                </button>
              </div>

              {/* Cuerpo */}
              <div className="space-y-3 text-sm text-gray-200">
                <div className="flex flex-wrap gap-2">
                  <Badge label="Días" />
                  <p className="text-gray-300">{open.dias.join(", ")}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge label="Medios" />
                  <p className="text-gray-300">{open.medios.join(" • ")}</p>
                </div>

                {open.topeReintegro && (
                  <div className="flex flex-wrap gap-2">
                    <Badge label="Tope" />
                    <p className="text-gray-300">{open.topeReintegro}</p>
                  </div>
                )}

                {open.vigencia && (
                  <div className="flex flex-wrap gap-2">
                    <Badge label="Vigencia" />
                    <p className="text-gray-300">{open.vigencia}</p>
                  </div>
                )}

                {open.condiciones?.length ? (
                  <div>
                    <p className="font-medium text-emerald-300 mb-1">
                      Condiciones
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {open.condiciones.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {open.legalesUrl && (
                  <div>
                    <a
                      href={open.legalesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 hover:underline text-xs"
                    >
                      Ver legales del comercio
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

/* ===== Sub-componente interno simple para la “etiqueta” de fila ===== */
function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-medium">
      {label}
    </span>
  );
}
