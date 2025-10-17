import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Card } from "../UI/Card";
import { mockDescuentos, type Descuento } from "../../mocks/mockDescuentos";

type Props = { className?: string };

/* ===========================
   Modal básico via Portal
   - Bloquea scroll
   - Captura clicks del backdrop
   - Cierra con Esc
=========================== */
function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  // Bloquear scroll de body mientras el modal está abierto
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Cerrar con tecla ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Para evitar “click-through” al cerrar
  const closeSafely = () => setTimeout(onClose, 0);

  const modalUI = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      // usamos onMouseDown (no onClick) para capturar antes
      onMouseDown={(e) => {
        // si el click fue en el backdrop, cerramos
        if (e.target === e.currentTarget) {
          e.stopPropagation();
          closeSafely();
        }
      }}
      className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4"
    >
      <div
        // detener eventos dentro del contenido
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-gray-900 border border-white/10 p-4 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3 mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
            {subtitle ? (
              <p className="text-sm text-emerald-300">{subtitle}</p>
            ) : null}
          </div>
          <button
            onClick={closeSafely}
            onMouseDown={(e) => e.preventDefault()}
            className="text-gray-400 hover:text-gray-200 text-sm"
          >
            Cerrar
          </button>
        </div>

        <div className="space-y-3 text-sm text-gray-200">{children}</div>
      </div>
    </div>
  );

  // Portal: elimina cualquier conflicto de z-index/stacking context
  return createPortal(modalUI, document.body);
}

/* Etiqueta “pill” reutilizable */
function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-medium">
      {label}
    </span>
  );
}

/* ===========================
   Card: Descuentos del Día
=========================== */
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
                  onMouseDown={(e) => e.preventDefault()} // evita “ghost click”
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

        {/* Modal detallado */}
        {open &&
          <Modal
            title={open.comercio}
            subtitle={open.titulo}
            onClose={() => setOpen(null)}
          >
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
                <p className="font-medium text-emerald-300 mb-1">Condiciones</p>
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
          </Modal>
        }
      </Card>
    </div>
  );
};
