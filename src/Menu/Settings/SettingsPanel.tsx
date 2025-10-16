import React from "react";
import { WIDGETS, type WidgetId } from "../../widgets/registry";

type Props = {
  visibleById: Record<WidgetId, boolean>;
  toggle: (id: WidgetId) => void;
  reset: () => void;
};

export const SettingsPanel: React.FC<Props> = ({ visibleById, toggle, reset }) => (
  <div className="p-4 text-gray-100">
    <p className="text-gray-400 mb-3 text-base sm:text-sm">Elegí qué widgets mostrar:</p>

    <div className="space-y-2">
      {WIDGETS.map((w) => (
        <label
          key={w.id}
          className="flex items-center justify-between rounded-md bg-gray-700/30 hover:bg-gray-700/50 transition px-4 py-3 sm:px-3 sm:py-2"
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
      className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 font-medium rounded-md py-3 sm:py-2 text-base sm:text-sm"
    >
      Restaurar por defecto
    </button>
  </div>
);

/* 
El SettingsPanel solo se encarga de mostrar los checkboxes de widgets.
No abre ni cierra nada.

Solo recibe 3 cosas que le pasa Launcher:

visibleById: cuáles están visibles.

toggle: cómo alternar uno.

reset: cómo restaurar todo.

Es decir:
SettingsPanel no guarda estado, solo usa el estado que le pasa Launcher.

*/