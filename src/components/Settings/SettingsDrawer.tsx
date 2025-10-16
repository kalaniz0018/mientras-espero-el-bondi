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
 * - Secciones: Configuración, Usuario, Tema, Acerca
 * - Mobile first: fuentes, paddings y controles más grandes
 */
export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  visibleById,
  toggle,
  reset,
}) => {
  const [activeSection, setActiveSection] =
    useState<"config" | "user" | "theme" | "about">("config");

  // Botón de sección (sidebar)
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
      className={`flex items-center gap-2 w-full rounded-md transition
        px-4 py-3 sm:py-2
        text-base sm:text-sm
        ${
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
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full
        w-[92vw] sm:w-80
        bg-gray-800 text-gray-100 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 sm:py-3 border-b border-gray-700">
          <h2 className="font-semibold text-xl sm:text-lg">
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
            className="text-gray-300 hover:text-white text-2xl sm:text-xl"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex h-[calc(100%-64px)] sm:h-[calc(100%-56px)]">
          {/* Sidebar */}
          <aside className="w-40 sm:w-32 border-r border-gray-700 flex flex-col gap-2 py-4 px-2">
            <SectionButton id="config" label="Config" icon="⚙️" />
            <SectionButton id="user" label="Usuario" icon="👤" />
            <SectionButton id="theme" label="Tema" icon="🎨" />
            <SectionButton id="about" label="Acerca" icon="ℹ️" />
          </aside>

          {/* Content */}
          <main className="flex-1 p-4 overflow-y-auto">
            {activeSection === "config" && (
              <>
                <p className="text-gray-400 mb-3 text-base sm:text-sm">
                  Elegí qué widgets mostrar:
                </p>

                <div className="space-y-2">
                  {WIDGETS.map((w) => (
                    <label
                      key={w.id}
                      className="flex items-center justify-between rounded-md
                        bg-gray-700/30 hover:bg-gray-700/50 transition
                        px-4 py-3 sm:px-3 sm:py-2"
                    >
                      <span className="text-base sm:text-sm">{w.label}</span>
                      <input
                        type="checkbox"
                        checked={visibleById[w.id]}
                        onChange={() => toggle(w.id)}
                        className="accent-emerald-500 cursor-pointer h-5 w-5 sm:h-4 sm:w-4"
                      />
                    </label>
                  ))}
                </div>

                <button
                  onClick={reset}
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 font-medium
                    rounded-md py-3 sm:py-2 text-base sm:text-sm"
                >
                  Restaurar por defecto
                </button>
              </>
            )}

            {activeSection === "user" && (
              <div className="text-base sm:text-sm space-y-3">
                <p>Funcionalidad de usuario en construcción 👷‍♀️</p>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md py-3 sm:py-2 px-4">
                  Iniciar sesión
                </button>
              </div>
            )}

            {activeSection === "theme" && (
              <div className="text-base sm:text-sm space-y-3">
                <p>Modo claro / oscuro (próximamente 🌗)</p>
              </div>
            )}

            {activeSection === "about" && (
              <div className="text-base sm:text-sm space-y-2">
                <p>
                 <strong>Mientras Espero el Bondi</strong> es un proyecto
                  personal creado para acompañarte día a día 🚌
                </p>
                <p className="text-gray-400 text-sm">
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
