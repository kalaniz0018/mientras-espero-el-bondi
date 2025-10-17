// src/Menu/Settings/SettingsPanel.tsx
import React, { useEffect, useMemo, useState } from "react";
import { WIDGETS, type WidgetId } from "../../widgets/registry";

type Props = {
  visibleById: Record<WidgetId, boolean>;
  toggle: (id: WidgetId) => void;
  reset: () => void; // no lo usamos directo (el reset es sobre el borrador)
};

// Defaults calculados desde el registro
function computeDefaults(): Record<WidgetId, boolean> {
  const entries = WIDGETS.map(
    (w) => [w.id, w.defaults?.visible ?? true] as const
  );
  return Object.fromEntries(entries) as Record<WidgetId, boolean>;
}

export const SettingsPanel: React.FC<Props> = ({ visibleById, toggle /* reset */ }) => {
  // Borrador local (no afecta el tablero hasta “Guardar cambios”)
  const [draft, setDraft] = useState<Record<WidgetId, boolean>>(visibleById);

  // Cuando cambie el estado real (p.ej. desde otro lado), reseteamos el borrador
  useEffect(() => {
    setDraft(visibleById);
  }, [visibleById]);

  // Cantidad seleccionada en el borrador
  const selectedCount = useMemo(
    () => Object.values(draft).filter(Boolean).length,
    [draft]
  );

  // Cambiar un checkbox en el borrador
  const toggleDraft = (id: WidgetId) => {
    setDraft((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Restaurar por defecto (en el borrador)
  const restoreDefaultsInDraft = () => {
    setDraft(computeDefaults());
  };

  // Guardar: diffs entre borrador y estado real → aplicar con toggle()
  const saveChanges = () => {
    (Object.keys(draft) as WidgetId[]).forEach((id) => {
      if (draft[id] !== visibleById[id]) {
        toggle(id);
      }
    });
    // Opcional: podríamos mostrar un toast o cerrar el panel desde afuera
  };

  return (
    <div className="p-4 text-gray-100">
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
              checked={draft[w.id]}
              onChange={() => toggleDraft(w.id)}
              className="accent-emerald-500 cursor-pointer h-5 w-5 sm:h-4 sm:w-4"
            />
          </label>
        ))}
      </div>

      {/* Mensaje de validación */}
      {selectedCount === 0 && (
        <p className="mt-3 text-xs text-red-400">
          Debe haber al menos un widget seleccionado.
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-2">
        <button
          onClick={saveChanges}
          disabled={selectedCount === 0}
          className={`w-full font-medium rounded-md py-3 sm:py-2 text-base sm:text-sm
            ${selectedCount === 0
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"}`}
        >
          Guardar cambios
        </button>

        <button
          onClick={restoreDefaultsInDraft}
          className="w-full bg-gray-700 hover:bg-gray-600 font-medium
            rounded-md py-3 sm:py-2 text-base sm:text-sm"
        >
          Restaurar por defecto (borrador)
        </button>
      </div>
    </div>
  );
};
