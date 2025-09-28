// src/components/Descuentos/Descuentos.tsx
import React from "react";
import { Card } from "../UI/Card";
import { mockDescuentos } from "../../mocks/mockData";

type DiscountItem = {
  supermercado: string;     // ej: "Carrefour"
  promo: string;            // ej: "20% de descuento con Visa los miércoles"
  days?: number[];          // opcional: 0=Dom ... 6=Sáb
  url?: string;             // opcional: link a la promo
};

type DescuentosProps = { className?: string };

/* --- Helpers UI --- */
const todayIdx = new Date().getDay();

const appliesToday = (d?: number[]) => (Array.isArray(d) ? d.includes(todayIdx) : false);

function highlightPromo(promo: string): React.ReactNode {
  // Resalta porcentajes y "2x1" sin romper accesibilidad
  const parts = promo.split(/(\b\d{1,2}%|\b2x1\b)/gi);
  return parts.map((p, i) =>
    /\b\d{1,2}%|\b2x1\b/i.test(p) ? (
      <strong key={i} className="text-gray-100">
        {p}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

export const Descuentos: React.FC<DescuentosProps> = ({ className = "" }) => {
  // Tipar suave para que sea compatible con tu mock actual
  const items: DiscountItem[] = mockDescuentos;

  // Orden: primero los que aplican hoy
  const sorted = [...items].sort((a, b) => Number(appliesToday(b.days)) - Number(appliesToday(a.days)));

return (
  <div className={className}>
    <Card title="Descuentos del Día" icon="🛒">
      {sorted.length === 0 ? (
        <div className="text-sm text-gray-400 py-6 px-2">
          No hay descuentos cargados por ahora.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200/10 dark:divide-gray-700/40 text-sm">
          {sorted.map((item, idx) => {
            const Wrapper: React.ElementType = item.url ? "a" : "div";

            return (
              <li key={idx} className="py-3 first:pt-0 last:pb-0">
                <Wrapper
                  href={item.url}
                  target={item.url ? "_blank" : undefined}
                  rel={item.url ? "noopener noreferrer" : undefined}
                  className="group block rounded-md px-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition"
                >
                  {/* supermercado como subtítulo */}
                  <h3 className="font-semibold text-base text-gray-100 mb-1">
                    {item.supermercado}
                  </h3>

                  {/* promo */}
                  <p className="text-gray-300 group-hover:underline underline-offset-2">
                    {highlightPromo(item.promo)}
                  </p>
                </Wrapper>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  </div>
);



};
