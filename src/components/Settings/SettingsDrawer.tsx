// src/components/Settings/SettingsDrawer.tsx
import React from "react";
import { WIDGETS, type WidgetId } from "../../widgets/registry";

type SettingsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  visibleById: Record<WidgetId, boolean>;
  toggle: (id: WidgetId) => void;
  reset: () => void;
};

/** Panel lateral de configuración de widgets */
export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  visibleById,
  toggle,
  reset,
}) => {
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
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Configuración</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto">
          <p className="text-sm text-gray-400 mb-2">
            Seleccioná qué widgets querés mostrar:
          </p>
          {WIDGETS.map((w) => (
            <label
              key={w.id}
              className="flex items-center justify-between p-2 bg-gray-700/30 rounded-md cursor-pointer hover:bg-gray-700/50 transition"
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
        </div>
      </div>
    </>
  );
};
