// src/App.tsx
import { useEffect, useState } from "react";
import { useDashboardPrefs } from "./hooks/useDashboardPrefs";
import { SettingsDrawer } from "./components/Settings/SettingsDrawer";
import { WIDGETS } from "./widgets/registry";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Hook que maneja visibilidad y orden de widgets
  const { visibleById, order, toggle, reset } = useDashboardPrefs();

  // Estado local para abrir/cerrar el panel de configuración
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fullDate = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* NAVBAR (única barra superior, escalable) */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          {/* Título corto a la izquierda */}
          <div className="text-lg sm:text-xl font-extrabold tracking-tight">
            Mientras espero el 🚌
          </div>

          {/* Acciones en desktop (4 por ahora) */}
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <button
              onClick={() => setDrawerOpen(true)}
              className="hover:text-emerald-400 transition"
            >
              Config
            </button>
            <button className="hover:text-emerald-400 transition">
              Usuario
            </button>
            <button className="hover:text-emerald-400 transition">Tema</button>
            <button className="hover:text-emerald-400 transition">
              Acerca
            </button>
          </nav>

          {/* Hamburguesa en mobile (abre el mismo drawer) */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="sm:hidden text-2xl px-2 py-1 hover:text-white text-gray-300"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="py-6 px-4 flex justify-center">
        <div className="w-full max-w-6xl">
          {/* Fecha (discreta) */}
          <p className="mb-4 text-xs sm:text-sm text-gray-300 text-center sm:text-right capitalize">
            {fullDate}
          </p>

          {/* Grilla de widgets */}
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

      {/* Drawer lateral (menú maestro / Config) */}
      <SettingsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        visibleById={visibleById}
        toggle={toggle}
        reset={reset}
      />
    </div>
  );
}

export default App;
