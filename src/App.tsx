/* import { useEffect } from "react";
import { useDashboardPrefs } from "./hooks/useDashboardPrefs";
import { WIDGETS } from "./widgets/registry";
import { Launcher } from "./Menu/Launcher";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const { visibleById, order, toggle, reset } = useDashboardPrefs();

  const fullDate = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="text-lg sm:text-xl font-extrabold tracking-tight">
            Mientras espero el 🚌
          </div>

        <nav className="hidden sm:flex items-center gap-6 text-sm">
            <button onClick={() => window.openSettings?.("config")} className="hover:text-emerald-400 transition">Config</button>
            <button onClick={() => window.openSettings?.("user")} className="hover:text-emerald-400 transition">Usuario</button>
            <button onClick={() => window.openSettings?.("theme")} className="hover:text-emerald-400 transition">Tema</button>
            <button onClick={() => window.openSettings?.("about")} className="hover:text-emerald-400 transition">Acerca</button>
          </nav>

          <button
            onClick={() => window.openSettings?.("config")}
            className="sm:hidden text-2xl px-2 py-1 hover:text-white text-gray-300"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>
      </header>

      <main className="py-6 px-4 flex justify-center">
        <div className="w-full max-w-6xl">
          <p className="mb-4 text-xs sm:text-sm text-gray-300 text-center sm:text-right capitalize">
            {fullDate}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
            {order.map((id) => {
              const widget = WIDGETS.find((w) => w.id === id);
              if (!widget || !visibleById[id]) return null;
              const Component = widget.component;
              return <Component key={id} />;
            })}
          </div>
        </div>
      </main>

      <Launcher visibleById={visibleById} toggle={toggle} reset={reset} />
    </div>
  );
}

export default App;
 */


// src/App.tsx
import { useEffect, useState } from "react";
import { useDashboardPrefs } from "./hooks/useDashboardPrefs";
import { WIDGETS } from "./widgets/registry";
import { Launcher } from "./Menu/Launcher";
import { getDashboard } from "./api/getDashboard";
import type { AnyCard } from "./types/Cards";

function App() {
  // 1) Forzar modo oscuro al cargar
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // 2) Preferencias de usuario (visibilidad y orden de widgets)
  const { visibleById, order, toggle, reset } = useDashboardPrefs();

  // 3) Fecha actual en formato lindo
  const fullDate = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // 4) Traer TODAS las cards desde el backend (una sola llamada)
  const [cards, setCards] = useState<AnyCard[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboard()
      .then((arr) => setCards(arr)) // ⬅️ ahora la API devuelve un array directo
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="text-lg sm:text-xl font-extrabold tracking-tight">
            Mientras espero el 🚌
          </div>

          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <button
              onClick={() => window.openSettings?.("config")}
              className="hover:text-emerald-400 transition"
            >
              Config
            </button>
            <button
              onClick={() => window.openSettings?.("user")}
              className="hover:text-emerald-400 transition"
            >
              Usuario
            </button>
            <button
              onClick={() => window.openSettings?.("theme")}
              className="hover:text-emerald-400 transition"
            >
              Tema
            </button>
            <button
              onClick={() => window.openSettings?.("about")}
              className="hover:text-emerald-400 transition"
            >
              Acerca
            </button>
          </nav>

          <button
            onClick={() => window.openSettings?.("config")}
            className="sm:hidden text-2xl px-2 py-1 hover:text-white text-gray-300"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="py-6 px-4 flex justify-center">
        <div className="w-full max-w-6xl">
          <p className="mb-4 text-xs sm:text-sm text-gray-300 text-center sm:text-right capitalize">
            {fullDate}
          </p>

          {/* Panel de depuración (ver JSON del backend) */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm">
              Error cargando dashboard: {error}
            </div>
          )}
          {!cards && !error && (
            <div className="mb-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm">
              Cargando datos del dashboard…
            </div>
          )}
          {cards && (
            <details className="mb-6 rounded-lg border border-gray-800 bg-black/30 p-3">
              <summary className="cursor-pointer text-sm text-gray-300">
                Ver JSON crudo del backend (para debug)
              </summary>
              <pre className="mt-2 text-xs whitespace-pre-wrap text-gray-300">
                {JSON.stringify(cards, null, 2)}
              </pre>
            </details>
          )}

          {/* Widgets del dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
            {order.map((id) => {
              const widget = WIDGETS.find((w) => w.id === id);
              if (!widget || !visibleById[id]) return null;
              const Component = widget.component;
              return <Component key={id} />;
            })}
          </div>
        </div>
      </main>

      {/* DRAWER DE CONFIGURACIÓN */}
      <Launcher visibleById={visibleById} toggle={toggle} reset={reset} />
    </div>
  );
}

export default App;
