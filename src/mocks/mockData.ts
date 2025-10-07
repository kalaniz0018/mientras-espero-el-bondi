export type DiscountItem = {
  supermercado: string;
  promo: string;
  days?: number[];
  url?: string;
};

/* export const mockDescuentos: DiscountItem[] = [
  {
    supermercado: "Carrefour",
    promo: "20% de descuento con tarjetas Visa los miércoles",
  },
  {
    supermercado: "Coto",
    promo: "2x1 en carnes seleccionadas (solo lunes y martes)",
  },
  {
    supermercado: "Día",
    promo: "15% con Cuenta DNI de lunes a jueves",
  },
];
 */



export const mockWeather = {
  location: "Buenos Aires",
  temperature: "29°C",        // puede venir como string con unidad
  feelsLike: "32°C",          // idem
  condition: "Soleado",       // probá con "Lluvia", "Tormenta", "Nublado", etc.
  precipitationProb: "10%",   // 0–100
  windKmh: "18 km/h",
  uvIndex: "7",
  humidity: "55%",

  // Pronóstico muy breve por parte del día (opcional)
  forecast: [
    { period: "mañana", min: "20", max: "27", pop: "10" },
    { period: "tarde",  min: "27", max: "31", pop: "20" },
    { period: "noche",  min: "22", max: "25", pop: "5"  },
  ],
};

export const mockNews = [
  { title: "El dólar volvió a subir", source: "La Nación", url: "https://...", publishedAt: "28/09" },
  { title: "Nuevas medidas económicas", source: "Clarín", url: "https://...", summary: "El paquete incluye..." },
  { title: "Marchas en el centro", source: "Página 12", url: "https://..." },
];

export const mockEfemerides = [
  "1816: Se firma la Independencia Argentina.",
  "1930: Nace el escritor Ernesto Sábato.",
  "2001: Argentina entra en default.",
];

export const mockFeriado = [
  // === FERIADOS NACIONALES 2025 ===
  { name: "Año Nuevo", startDate: "2025-01-01" },

  // Carnaval (2 días)
  { name: "Carnaval", startDate: "2025-03-03", endDate: "2025-03-04" },

  { name: "Día Nacional de la Memoria por la Verdad y la Justicia", startDate: "2025-03-24" },

  { name: "Viernes Santo", startDate: "2025-04-18" },

  { name: "Día del Trabajador", startDate: "2025-05-01" },
  { name: "Día de la Revolución de Mayo", startDate: "2025-05-25" },

  { name: "Paso a la Inmortalidad de Güemes", startDate: "2025-06-17" },
  { name: "Día de la Bandera", startDate: "2025-06-20" },

  { name: "Día de la Independencia", startDate: "2025-07-09" },

  { name: "Paso a la Inmortalidad de San Martín", startDate: "2025-08-17" },

  {
    name: "Día del Respeto a la Diversidad Cultural",
    startDate: "2025-10-12",
  },

  { name: "Día de la Soberanía Nacional", startDate: "2025-11-20" },

  { name: "Inmaculada Concepción", startDate: "2025-12-08" },
  { name: "Navidad", startDate: "2025-12-25" },

  // === EVENTOS ESTACIONALES ===
  { name: "Comienza el Otoño", startDate: "2025-03-20" },
  { name: "Comienza el Invierno", startDate: "2025-06-21" },
  { name: "Comienza la Primavera", startDate: "2025-09-22" },
  { name: "Comienza el Verano", startDate: "2025-12-21" },
];

export const mockHoroscopo = {
  signo: "Leo",
  mensaje:
    "Hoy es un buen día para tomar decisiones importantes y enfocarte en tus metas personales.",
};

