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

  return (
    <div className="min-h-screen bg-gray-900 py-6 px-4 flex justify-center text-white">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <h1 className="text-3xl font-bold text-center sm:text-left">
            Mientras Espero el bondi
          </h1>

          <div className="flex items-center gap-3 justify-center sm:justify-end">
            <p className="text-sm text-gray-300 hidden sm:block">
              {new Date().toLocaleDateString("es-AR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <button
              onClick={() => setDrawerOpen(true)}
              className="text-gray-400 hover:text-white text-xl"
              title="Configurar widgets"
            >
              ⚙️
            </button>
          </div>
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
