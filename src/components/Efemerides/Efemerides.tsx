import React, { useEffect, useState } from "react";
import { Card } from "../UI/Card";

/* ================== Tipos mínimos del endpoint de Wikipedia ES ================== */
type WikimediaContentUrls = { desktop?: { page?: string } };
type WikimediaPage = { content_urls?: WikimediaContentUrls };
type WikimediaEvent = { year: number; text?: string; pages?: WikimediaPage[] };
type OnThisDayResponse = { events?: WikimediaEvent[] };

type Efemeride = { year: number; text: string; link?: string };

type EfemeridesProps = {
  className?: string;
  /** Cuántas mostrar (por defecto 3) */
  limit?: number;
};

/* ================== Configuración simple y explícita ================== */
const MIN_YEAR = 1800; // “moderno” a partir de este año

/* ================== Helpers de formateo (simples, sin sobre–abstraer) ================== */

/** Formatea el año: -480 => "480 a. C.", 1816 => "1816" */
function formatYear(y: number): string {
  return y < 0 ? `${Math.abs(y)} a. C.` : String(y);
}

/** Mayúscula inicial y punto final si falta */
function sentenceCase(s: string): string {
  const trimmed = s.trim().replace(/\s+/g, " ");
  if (!trimmed) return trimmed;
  const withCap = trimmed[0].toUpperCase() + trimmed.slice(1);
  return /[.!?…]$/.test(withCap) ? withCap : withCap + ".";
}

/** Recorta a primera oración razonable o a ~175 chars */
function smartTrim(s: string, max = 175): string {
  const firstDot = s.indexOf(".");
  const base = firstDot > 40 ? s.slice(0, firstDot + 1) : s; // usa 1ra oración si no es ínfima
  if (base.length <= max) return base;
  const cut = s.slice(0, max).replace(/\s+\S*$/, ""); // no cortar palabra
  return cut + "…";
}

/** Limpieza mínima de texto crudo de Wikipedia */
function cleanWikiText(s: string): string {
  return s
    .replace(/\s*\([^)]*\)\s*/g, " ") // quita (paréntesis largos)
    .replace(/\s*\[[^\]]*\]\s*/g, " ") // quita [notas]
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Scoring: prioriza AR/LatAm y términos cercanos */
function scoreText(t: string): number {
  const s = t.toLowerCase();
  let score = 0;
  const plus = (n: number) => (score += n);

  // Argentina / LatAm
  if (/\bargentina|argentino|buenos aires|córdoba|rosario\b/.test(s)) plus(50);
  if (/\bamérica latina|hispanoamérica|rio de la plata|conicet|afa\b/.test(s)) plus(20);

  // Temas comunes locales
  if (/\bindependencia|constitución|presidente|default|economía\b/.test(s)) plus(10);

  return score;
}

/** Transforma el array crudo del endpoint en items listos para render */
function buildEfemerides(
  events: WikimediaEvent[],
  limit: number
): Efemeride[] {
  // 1) Normaliza TODOS los eventos válidos
  const all: Efemeride[] = events
    .filter((e) => typeof e.year === "number" && e.text) // ← acá podría ir tu filter de año si no quisieras fallback
    .map((e) => {
      const raw = cleanWikiText(e.text!);
      const trimmed = smartTrim(raw);
      const nice = sentenceCase(trimmed);
      return {
        year: e.year,
        text: nice,
        link: e.pages?.[0]?.content_urls?.desktop?.page,
      };
    });

  // 2) Separa en modernos (>= MIN_YEAR) y antiguos (< MIN_YEAR)
  const modernos = all.filter((i) => i.year >= MIN_YEAR);
  const antiguos = all.filter((i) => i.year < MIN_YEAR);

  // 3) Ordena cada grupo por score (desc) y luego año (asc)
  const byRelevance = (a: Efemeride, b: Efemeride) => {
    const diff = scoreText(b.text) - scoreText(a.text);
    return diff !== 0 ? diff : a.year - b.year;
  };
  modernos.sort(byRelevance);
  antiguos.sort(byRelevance);

  // 4) Arma la lista final con fallback: primero modernos, si falta rellena con antiguos
  const combined = [...modernos, ...antiguos];

  // 5) (Opcional) si preferís estrictamente modernos sin fallback, reemplazá la línea anterior por:
  // const combined = modernos;

  return combined.slice(0, limit);
}

/* ================== Componente ================== */
export const Efemerides: React.FC<EfemeridesProps> = ({
  className = "",
  limit = 3,
}) => {
  const [items, setItems] = useState<Efemeride[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
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
        const finalItems = buildEfemerides(data.events ?? [], limit);

        setItems(finalItems);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setErr("No pudimos cargar las efemérides ahora.");
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [limit]); // si cambia `limit`, recalculamos

  const visible = items;

  return (
    <div className={className}>
      <Card title="Efemérides" icon="📚">
        {/* Subtítulo tipo “pill” como en tu mock */}
        <span className="inline-block rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-medium px-2 py-0.5 mb-3">
          Lo que pasó un día como hoy
        </span>

        {loading ? (
          <p className="text-sm text-gray-400">Cargando…</p>
        ) : err ? (
          <p className="text-sm text-rose-400">{err}</p>
        ) : visible.length === 0 ? (
          <div className="text-sm text-gray-400 py-6 px-2">
            No hay efemérides para mostrar por ahora.
          </div>
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
                    aria-label={item.link ? `Abrir en Wikipedia: ${item.text}` : undefined}
                  >
                    {/* Año como chip, formateado (maneja a. C.) */}
                    <span className="shrink-0 inline-flex items-center justify-center rounded-full bg-gray-700/40 text-gray-100 px-2 py-0.5 text-[11px] font-semibold tabular-nums w-16 text-center">
                      {formatYear(item.year)}
                    </span>

                    {/* Texto limpio y compacto */}
                    <p className="text-gray-200 leading-relaxed break-words">
                      {item.text}
                    </p>
                  </Content>

                  {idx < visible.length - 1 && (
                    <div className="mt-2 h-px bg-gray-700/20" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
};
