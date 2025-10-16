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
      {/* NAVBAR PRINCIPAL */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        {/* Contenedor título + hamburguesa */}
        <div className="flex items-center justify-center sm:justify-between w-full relative">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center sm:text-left flex-1">
            Mientras Espero el bondi
          </h1>

          {/* Ícono hamburguesa (mobile) */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="sm:hidden text-gray-300 hover:text-white text-2xl p-2 transition absolute right-0 top-1/2 -translate-y-1/2"
            aria-label="Abrir menú"
          >
            ☰
          </button>

          {/* Menú desktop */}
          <ul className="hidden sm:flex items-center gap-6 text-sm">
            <li>
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-1 hover:text-emerald-400 transition"
              >
                ⚙️ <span>Configuración</span>
              </button>
            </li>
            <li>
              <button className="hover:text-emerald-400 transition">
                Iniciar sesión
              </button>
            </li>
            <li>
              <button className="hover:text-emerald-400 transition">
                Acerca de
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Fecha debajo del título */}
      <p className="text-xs sm:text-sm text-gray-300 text-center sm:text-right mb-4 capitalize">
        {fullDate}
      </p>

      {/* GRILLA DE WIDGETS */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
        {order.map((id) => {
          const widget = WIDGETS.find((w) => w.id === id);
          if (!widget || !visibleById[id]) return null;
          const Component = widget.component;
          return <Component key={id} />;
        })}
      </main>

      {/* DRAWER DE CONFIGURACIÓN */}
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
