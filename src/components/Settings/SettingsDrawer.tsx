// src/components/Settings/SettingsDrawer.tsx
import React, { useState } from "react";
import { WIDGETS, type WidgetId } from "../../widgets/registry";

type SettingsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  visibleById: Record<WidgetId, boolean>;
  toggle: (id: WidgetId) => void;
  reset: () => void;
};

/**
 * Drawer lateral principal del sistema
 * - Contiene secciones (Configuración, Usuario, Apariencia, Acerca de)
 * - Escalable para agregar más sin romper la estructura
 */
export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  visibleById,
  toggle,
  reset,
}) => {
  const [activeSection, setActiveSection] = useState<"config" | "user" | "theme" | "about">("config");

  // Sección individual reusable
  const SectionButton = ({
    id,
    label,
    icon,
  }: {
    id: typeof activeSection;
    label: string;
    icon: string;
  }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`flex items-center gap-2 px-4 py-2 text-left w-full rounded-md transition ${
        activeSection === id
          ? "bg-emerald-600 text-white"
          : "text-gray-300 hover:bg-gray-700"
      }`}
    >
      <span>{icon}</span> {label}
    </button>
  );

  return (
    <>
      {/* Fondo oscuro */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-800 text-gray-100 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h2 className="text-lg font-semibold">
            {activeSection === "config"
              ? "Configuración"
              : activeSection === "user"
              ? "Usuario"
              : activeSection === "theme"
              ? "Apariencia"
              : "Acerca de"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Sidebar con secciones */}
        <div className="flex h-full">
          {/* Menú lateral izquierdo */}
          <aside className="w-32 border-r border-gray-700 flex flex-col gap-2 py-4">
            <SectionButton id="config" label="Config" icon="⚙️" />
            <SectionButton id="user" label="Usuario" icon="👤" />
            <SectionButton id="theme" label="Tema" icon="🎨" />
            <SectionButton id="about" label="Acerca" icon="ℹ️" />
          </aside>

          {/* Contenido dinámico */}
          <main className="flex-1 p-4 overflow-y-auto">
            {activeSection === "config" && (
              <>
                <p className="text-sm text-gray-400 mb-3">
                  Elegí qué widgets mostrar:
                </p>
                {WIDGETS.map((w) => (
                  <label
                    key={w.id}
                    className="flex items-center justify-between p-2 bg-gray-700/30 rounded-md cursor-pointer hover:bg-gray-700/50 transition mb-1"
                  >
                    <span className="text-sm">{w.label}</span>
                    <input
                      type="checkbox"
                      checked={visibleById[w.id]}
                      onChange={() => toggle(w.id)}
                      className="accent-emerald-500 cursor-pointer"
                    />
                  </label>
                ))}
                <button
                  onClick={reset}
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-sm font-medium py-2 rounded-md"
                >
                  Restaurar por defecto
                </button>
              </>
            )}

            {activeSection === "user" && (
              <div className="text-sm space-y-2">
                <p>Funcionalidad de usuario en construcción 👷‍♀️</p>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-md text-sm">
                  Iniciar sesión
                </button>
              </div>
            )}

            {activeSection === "theme" && (
              <div className="text-sm space-y-3">
                <p>Modo claro / oscuro (próximamente 🌗)</p>
              </div>
            )}

            {activeSection === "about" && (
              <div className="text-sm space-y-2">
                <p>
                  <strong>Mientras Espero el Bondi</strong> es un proyecto
                  personal creado para acompañarte día a día 🚌
                </p>
                <p className="text-gray-400 text-xs">
                  Versión 1.0 — Desarrollado con ❤️ por Karina Alaniz
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};
