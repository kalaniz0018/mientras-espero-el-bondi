import React, { useState, useEffect } from "react";
import { SettingsPanel } from "./Settings/SettingsPanel";
import { UserPanel } from "./User/UserPanel";
import { ThemePanel } from "./Theme/Theme";
import { AboutPanel } from "./About/AboutPanel";
import { type WidgetId } from "../widgets/registry";

type Panel = "config" | "user" | "theme" | "about";

type Props = {
  visibleById: Record<WidgetId, boolean>;
  toggle: (id: WidgetId) => void;
  reset: () => void;
};

declare global {
  interface Window {
    openSettings?: (panel: Panel) => void;
  }
}

export const Launcher: React.FC<Props> = ({ visibleById, toggle, reset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<Panel>("config");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    window.openSettings = (panel: Panel) => {
      setActivePanel(panel);
      setIsOpen(true);
    };
    return () => {
      delete window.openSettings;
    };
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Desktop: panel individual */}
      {!isMobile && (
        <div className="fixed top-0 right-0 h-full w-80 bg-gray-800 text-gray-100 z-50 shadow-lg">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
            <h2 className="font-semibold text-lg capitalize">
              {activePanel === "config"
                ? "Configuración"
                : activePanel === "user"
                ? "Usuario"
                : activePanel === "theme"
                ? "Apariencia"
                : "Acerca de"}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          {activePanel === "config" && (
            <SettingsPanel visibleById={visibleById} toggle={toggle} reset={reset} />
          )}
          {activePanel === "user" && <UserPanel />}
          {activePanel === "theme" && <ThemePanel />}
          {activePanel === "about" && <AboutPanel />}
        </div>
      )}

      {/* Mobile: drawer con sidebar vertical */}
      {isMobile && (
        <div className="fixed top-0 right-0 h-full w-[92vw] sm:w-80 bg-gray-800 text-gray-100 z-50">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
            <h2 className="font-semibold text-lg capitalize">
              {activePanel === "config"
                ? "Configuración"
                : activePanel === "user"
                ? "Usuario"
                : activePanel === "theme"
                ? "Apariencia"
                : "Acerca de"}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex h-full">
            <aside className="w-32 border-r border-gray-700 flex flex-col gap-2 py-4 px-2">
              {(["config", "user", "theme", "about"] as Panel[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivePanel(tab)}
                  className={`flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm transition ${
                    activePanel === tab
                      ? "bg-emerald-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {tab === "config"
                    ? "Config"
                    : tab === "user"
                    ? "Usuario"
                    : tab === "theme"
                    ? "Tema"
                    : "Acerca"}
                </button>
              ))}
            </aside>

            <main className="flex-1 overflow-y-auto p-4">
              {activePanel === "config" && (
                <SettingsPanel visibleById={visibleById} toggle={toggle} reset={reset} />
              )}
              {activePanel === "user" && <UserPanel />}
              {activePanel === "theme" && <ThemePanel />}
              {activePanel === "about" && <AboutPanel />}
            </main>
          </div>
        </div>
      )}
    </>
  );
};


/* El Launcher ahora es el “contenedor general del menú”, 
Abre y cierra el panel lateral.
Sabe qué pestaña (config, usuario, tema, etc.) está activa.
Decide si mostrar un solo panel (desktop) o el drawer vertical (mobile).

Launcher = el cerebro del menú.
Los paneles (SettingsPanel, UserPanel, ThemePanel, etc.) 
son como “pantallitas” que el launcher muestra según la pestaña elegida.
*/