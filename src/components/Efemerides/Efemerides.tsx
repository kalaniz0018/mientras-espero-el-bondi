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


/* ------------------------------------------------------------------------------------------- */

// src/components/Efemerides.tsx
/* import React, { useEffect, useState } from "react";
import { Card } from "../UI/Card";

type Efemeride = {
  year: number;
  text: string;
  link?: string;
};

type EfemeridesProps = {
  className?: string;
  limit?: number;
}; */

/** ===== Tipos mínimos del endpoint de Wikipedia ES ===== */
/* type WikimediaContentUrls = {
  desktop?: { page?: string };
};
type WikimediaPage = {
  content_urls?: WikimediaContentUrls;
};
type WikimediaEvent = {
  year: number;
  text: string;
  pages?: WikimediaPage[];
};
type OnThisDayResponse = {
  events?: WikimediaEvent[];
}; */


/* export const Efemerides: React.FC<EfemeridesProps> = ({
  className = "",
  limit = 3,
}) => {
  const [items, setItems] = useState<Efemeride[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setErr(null);

        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");

        const url = `https://api.wikimedia.org/feed/v1/wikipedia/es/onthisday/events/${mm}/${dd}`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: OnThisDayResponse = await res.json();

        const parsed: Efemeride[] = (data.events ?? []).map((e) => ({
          year: e.year,
          text: e.text ?? "",
          link: e.pages?.[0]?.content_urls?.desktop?.page,
        }));

        parsed.sort((a, b) => a.year - b.year);
        setItems(parsed);
      } catch (e: unknown) {
       
        if (e instanceof DOMException && e.name === "AbortError") return;
        setErr("No pudimos cargar las efemérides ahora.");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ctrl.abort();
  }, []);

  const visible = items.slice(0, limit);

  return (
    <div className={className}>
      <Card title="Efemérides" icon="📚">
   
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] uppercase tracking-wide text-emerald-400">
            Lo que pasó un día como hoy
          </span>
          <div className="flex-1 h-px bg-gray-700/30" />
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">Cargando…</p>
        ) : err ? (
          <p className="text-sm text-rose-400">{err}</p>
        ) : visible.length === 0 ? (
          <p className="text-sm text-gray-400">No hay efemérides para mostrar.</p>
        ) : (
          <ul className="text-sm">
            {visible.map((item, idx) => {
              const Content: React.ElementType = item.link ? "a" : "div";
              return (
                <li key={`${item.year}-${idx}`} className="py-2 first:pt-0 last:pb-0">
                  <Content
                    href={item.link}
                    target={item.link ? "_blank" : undefined}
                    rel={item.link ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-3 rounded-md px-2 hover:bg-white/5 transition"
                  >
                    <span className="shrink-0 inline-flex items-center justify-center rounded-full bg-gray-700/40 text-gray-100 px-2 py-0.5 text-[11px] font-semibold tabular-nums w-12 text-center">
                      {item.year}
                    </span>
                    <p className="text-gray-200 leading-relaxed break-words">
                      {item.text}
                    </p>
                  </Content>

                  {idx < visible.length - 1 && <div className="mt-2 h-px bg-gray-700/20" />}
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
};
 */