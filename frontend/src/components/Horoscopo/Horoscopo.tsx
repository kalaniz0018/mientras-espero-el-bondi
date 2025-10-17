import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../UI/Card";
import {
  mockHoroscopo12,
  type HoroscopoSigno,
} from "../../mocks/mockDataSignos";

type HoroscopoProps = { className?: string };

// Clave para guardar la preferencia del usuario
const LS_KEY_SIGNO = "horoscopo_signo_pref";
type Tab = "hoy" | "semana";

export const Horoscopo: React.FC<HoroscopoProps> = ({ className = "" }) => {
  // ===== Estado =====
  const signos = useMemo(() => mockHoroscopo12.map((s) => s.signo), []);
  const [signoSel, setSignoSel] = useState<string>(signos[0] ?? "Aries");
  const [tab, setTab] = useState<Tab>("hoy");

  // Al montar: restaurar preferencia si existe
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY_SIGNO);
    if (saved && signos.includes(saved)) setSignoSel(saved);
  }, [signos]);

  // Al cambiar de signo: persistir
  useEffect(() => {
    localStorage.setItem(LS_KEY_SIGNO, signoSel);
  }, [signoSel]);

  // Buscar data del signo seleccionado (si no está, cae al primero)
  const data: HoroscopoSigno =
    mockHoroscopo12.find((s) => s.signo === signoSel) ?? mockHoroscopo12[0];

  return (
    <div className={className}>
      <Card title="Horóscopo" icon="🔮">
        {/* ===== Selector de signo (simple y usable en móvil) ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
          <label htmlFor="signo" className="text-xs text-gray-400">
            Elegí tu signo
          </label>
          <select
            id="signo"
            value={signoSel}
            onChange={(e) => setSignoSel(e.target.value)}
            className="w-full sm:w-auto rounded-md bg-gray-800 text-gray-100 border border-white/10 px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-emerald-400"
          >
            {signos.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>

          {/* Tabs Hoy / Semana */}
          <div className="flex items-center gap-1 sm:ml-auto">
            <button
              onClick={() => setTab("hoy")}
              className={`px-2 py-1 text-xs rounded-md border ${
                tab === "hoy"
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-gray-800 text-gray-300 border-white/10 hover:bg-gray-700"
              }`}
            >
              Hoy
            </button>
            <button
              onClick={() => setTab("semana")}
              className={`px-2 py-1 text-xs rounded-md border ${
                tab === "semana"
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-gray-800 text-gray-300 border-white/10 hover:bg-gray-700"
              }`}
            >
              Semana
            </button>
          </div>
        </div>

        {/* ===== Contenido ===== */}
        {tab === "hoy" ? (
          <ul className="text-sm text-gray-200 space-y-2">
            <li>
              <span className="font-semibold text-emerald-300">Amor: </span>
              <span className="align-middle">{data.hoy.amor}</span>
            </li>
            <li>
              <span className="font-semibold text-emerald-300">Trabajo: </span>
              <span className="align-middle">{data.hoy.trabajo}</span>
            </li>
            <li>
              <span className="font-semibold text-emerald-300">Energía: </span>
              <span className="align-middle">{data.hoy.energia}</span>
            </li>
          </ul>
        ) : (
          <div className="text-sm text-gray-300 leading-relaxed">
            {data.semana.resumen}
          </div>
        )}

        {/* CTA suave para futuro (opcional) */}
        {/* <div className="mt-3 text-xs text-gray-400">
          ¿Querés calcular tu ascendente y luna? Próximamente ✨
        </div> */}
      </Card>
    </div>
  );
};
