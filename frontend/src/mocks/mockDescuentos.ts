/* ================== Tipos + Mock de Descuentos ================== */

export type Descuento = {
  id: string;
  comercio: string;        // Coto, Carrefour, Día, etc.
  titulo: string;          // Título corto del beneficio
  resumen: string;         // Línea breve para la card
  dias: string[];          // Días aplicables (["Lunes", "Miércoles"])
  medios: string[];        // Medios de pago / bancos / apps
  topeReintegro?: string;  // Ej: "$15.000 por semana"
  vigencia?: string;       // Ej: "Octubre 2025"
  condiciones?: string[];  // Bullets importantes
  legalesUrl?: string;     // Link a legales del comercio
};

export const mockDescuentos: Descuento[] = [
  {
    id: "carrefour-visa-mie",
    comercio: "Carrefour",
    titulo: "20% con Visa los miércoles",
    resumen: "Miércoles: 20% con Visa crédito (sin tope general).",
    dias: ["Miércoles"],
    medios: ["Tarjeta Visa (crédito)"],
    topeReintegro: "Ver topes por banco",
    vigencia: "Vigente este mes",
    condiciones: [
      "Aplica en sucursales y online participantes.",
      "No acumulable con otras promos bancarias.",
    ],
    legalesUrl: "https://www.carrefour.com.ar/legales",
  },
  {
    id: "coto-2x1-carnes",
    comercio: "Coto",
    titulo: "2x1 en carnes (lun/mar)",
    resumen: "Lun y Mar: 2x1 en carnes seleccionadas.",
    dias: ["Lunes", "Martes"],
    medios: ["Todos los medios"],
    vigencia: "Según stock sucursal",
    condiciones: [
      "Excluye cortes premium y molidas especiales.",
      "No válido en Coto Digital.",
    ],
    legalesUrl: "https://www.coto.com.ar/legales",
  },
  {
    id: "dia-cuenta-dni",
    comercio: "Día",
    titulo: "15% con Cuenta DNI (lun a jue)",
    resumen: "Lun a Jue: 15% pagando con Cuenta DNI.",
    dias: ["Lunes", "Martes", "Miércoles", "Jueves"],
    medios: ["Cuenta DNI"],
    topeReintegro: "$4.000 por semana",
    vigencia: "Octubre 2025",
    condiciones: ["Exclusivo en tiendas adheridas.", "Aplican exclusiones."],
    legalesUrl: "https://www.diavisioficial.com/legales",
  },
];
