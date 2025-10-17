import type { AnyCard } from "../types/Cards";

/** Hace UNA sola llamada al backend y devuelve todas las cards (array). */
export async function getDashboard(): Promise<AnyCard[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? ""; // si usás proxy, puede quedar vacío
  const res = await fetch(`${base}/api/dashboard`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
  return res.json(); // => AnyCard[]
}
