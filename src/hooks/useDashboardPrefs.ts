// src/hooks/useDashboardPrefs.ts
import { useEffect, useState } from "react";
import { WIDGETS, type WidgetId } from "../widgets/registry";

/** Clave de localStorage (versionable para futuras migraciones) */
const STORAGE_KEY = "dashboardPrefs@v1";

type PrefsState = {
  visibleById: Record<WidgetId, boolean>;
  order: WidgetId[];
};

/**
 * Hook de preferencias del dashboard (visibilidad y orden)
 * - Carga desde localStorage
 * - Persiste automáticamente
 */
export function useDashboardPrefs() {
  const buildDefaults = (): PrefsState => ({
    visibleById: Object.fromEntries(
      WIDGETS.map((w) => [w.id, w.defaults?.visible ?? true])
    ) as Record<WidgetId, boolean>,
    order: WIDGETS.map((w) => w.id),
  });

  const [prefs, setPrefs] = useState<PrefsState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Sincroniza ids por si hubo cambios en el registro
        const synced = buildDefaults();
        for (const id of Object.keys(synced.visibleById)) {
          if (id in parsed.visibleById)
            synced.visibleById[id as WidgetId] = parsed.visibleById[id];
        }
        synced.order = parsed.order ?? synced.order;
        return synced;
      }
    } catch {
      /* ignore */
    }
    return buildDefaults();
  });

  // Persistencia automática
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  // Métodos públicos
  const setVisible = (id: WidgetId, visible: boolean) =>
    setPrefs((p) => ({
      ...p,
      visibleById: { ...p.visibleById, [id]: visible },
    }));

  const toggle = (id: WidgetId) =>
    setPrefs((p) => ({
      ...p,
      visibleById: { ...p.visibleById, [id]: !p.visibleById[id] },
    }));

  const reset = () => setPrefs(buildDefaults());

  return { ...prefs, setVisible, toggle, reset };
}
