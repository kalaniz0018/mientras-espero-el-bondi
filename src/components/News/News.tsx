import React from "react";
import { mockNews } from "../../mocks/mockData";
import { Card } from "../UI/Card";

// Estructura extensible: los campos extra son opcionales
type NewsItem = {
  title: string;
  source: string;
  url?: string;
  summary?: string;
  publishedAt?: string;
};

type NewsProps = {
  className?: string;
  limit?: number; // cuántas mostrar (por defecto 6)
};

// Subcomponente local para una fila (en el mismo archivo para no fragmentar de más)
const NewsRow: React.FC<{ item: NewsItem }> = ({ item }) => {
  const Wrapper: React.ElementType = item.url ? "a" : "div";

  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <Wrapper
        href={item.url}
        target={item.url ? "_blank" : undefined}
        rel={item.url ? "noopener noreferrer" : undefined}
        className="group block rounded-md px-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition"
        aria-label={item.title}
      >
        {/* Título */}
        <p className="font-semibold leading-snug group-hover:underline break-words">
          {item.title}
        </p>

        {/* Fuente + fecha (si existe) */}
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
          <span className="inline-flex items-center rounded-full bg-gray-700/40 px-2 py-0.5 text-[11px] font-medium text-gray-100 dark:bg-gray-700/60">
            {item.source}
          </span>
          {item.publishedAt && (
            <>
              <span className="opacity-60">•</span>
              <span>{item.publishedAt}</span>
            </>
          )}
        </div>

        {/* Bajada (si existe) */}
        {item.summary && (
          <p className="mt-1 text-sm text-gray-300/90 break-words">
            {item.summary}
          </p>
        )}
      </Wrapper>
    </li>
  );
};

export const News: React.FC<NewsProps> = ({ className = "", limit = 6 }) => {
  const items: NewsItem[] = mockNews.slice(0, limit);

  return (
    <div className={className}>
      <Card title="Noticias" icon="📰">
        {items.length === 0 ? (
          <div className="text-sm text-gray-400 py-6 px-2">
            No hay noticias para mostrar por ahora.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200/10 dark:divide-gray-700/40">
            {items.map((item, idx) => (
              <NewsRow key={idx} item={item} />
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};
