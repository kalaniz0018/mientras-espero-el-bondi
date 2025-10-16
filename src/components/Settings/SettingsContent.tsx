// src/settings/SettingsContent.tsx
import React from "react";
import { WIDGETS } from "../../widgets/registry";
import { type WidgetId } from "../../widgets/registry";

type SettingsContentProps = {
  activeTab: "config" | "user" | "theme" | "about";
  mode: "compact" | "drawer";
  visibleById: Record<WidgetId, boolean>;
  toggle: (id: WidgetId) => void;
  reset: () => void;
};

export const SettingsContent: React.FC<SettingsContentProps> = ({
  activeTab,
  visibleById,
  toggle,
  reset,
}) => {
  return (
    <div className="p-4 text-gray-100">
      {activeTab === "config" && (
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

      {activeTab === "user" && (
        <div className="text-base sm:text-sm space-y-3">
          <p>Funcionalidad de usuario en construcción 👷‍♀️</p>
        </div>
      )}

      {activeTab === "theme" && (
        <div className="text-base sm:text-sm space-y-3">
          <p>Modo claro / oscuro (próximamente 🌗)</p>
        </div>
      )}

      {activeTab === "about" && (
        <div className="text-base sm:text-sm space-y-2">
          <p>
            <strong>Mientras Espero el Bondi</strong> es un proyecto personal creado
            para acompañarte día a día 🚌
          </p>
          <p className="text-gray-400 text-sm">
            Versión 1.0 — Desarrollado con ❤️ por Karina Alaniz
          </p>
        </div>
      )}
    </div>
  );
};
