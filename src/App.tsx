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
    <div className="min-h-screen bg-gray-900 py-6 px-4 flex justify-center text-white">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          {/* Título + ⚙️ */}
          <div className="relative">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-center sm:text-left pr-10">
              Mientras Espero el bondi
            </h1>

            {/* ⚙️: fijo arriba derecha en mobile, alineado en desktop */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="absolute right-0 top-1.5 sm:top-0 text-gray-400 hover:text-white text-xl"
              title="Configurar widgets"
              aria-label="Configurar widgets"
            >
              ⚙️
            </button>
          </div>

          {/* Fecha completa */}
          <p className="mt-2 text-xs sm:text-sm text-gray-300 text-center sm:text-right leading-snug capitalize">
            {fullDate}
          </p>
        </div>

        {/* Grilla de widgets visibles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
          {order.map((id) => {
            const widget = WIDGETS.find((w) => w.id === id);
            if (!widget || !visibleById[id]) return null;
            const Component = widget.component;
            return <Component key={id} />;
          })}
        </div>

        {/* Drawer lateral de configuración */}
        <SettingsDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          visibleById={visibleById}
          toggle={toggle}
          reset={reset}
        />
      </div>
    </div>
  );
}

export default App;
