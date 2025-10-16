// src/App.tsx
import { useEffect } from "react";
import { useDashboardPrefs } from "./hooks/useDashboardPrefs";
import { WIDGETS } from "./widgets/registry";
import { SettingsLauncher } from "./components/Settings/SettingsLauncher";

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

      <SettingsLauncher
        visibleById={visibleById}
        toggle={toggle}
        reset={reset}
      />
    </div>
  );
}

export default App;
