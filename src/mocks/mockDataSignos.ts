/* ================== Horóscopo (tipos + mock) ================== */

export type HoroscopoDia = {
  amor: string;      // mini titular (máx ~90 chars)
  trabajo: string;   // mini titular
  energia: string;   // mini titular
};

export type HoroscopoSemana = {
  resumen: string;   // 2–3 líneas máx
};

export type HoroscopoSigno = {
  signo: string;          // Aries, Tauro, etc.
  hoy: HoroscopoDia;
  semana: HoroscopoSemana;
};

export const mockHoroscopo12: HoroscopoSigno[] = [
  {
    signo: "Aries",
    hoy: { amor: "Diálogo honesto destraba malentendidos.",
           trabajo: "Prioriza una tarea clave; evita dispersarte.",
           energia: "Alta pero irregular; dosificá." },
    semana: { resumen: "Momento para iniciar proyectos cortos. Evitá choques de ego; escucha activa suma aliados." }
  },
  {
    signo: "Tauro",
    hoy: { amor: "Pequeños gestos valen más que promesas.",
           trabajo: "Enfocate en calidad; un detalle te destaca.",
           energia: "Constante; cuidá el descanso." },
    semana: { resumen: "Base sólida para finanzas y rutinas. Buenas charlas con gente práctica te ordenan." }
  },
  {
    signo: "Géminis",
    hoy: { amor: "Mensaje oportuna reaviva conexión.",
           trabajo: "Tu idea necesita síntesis: menos es más.",
           energia: "Nerviosa; movete y respirá." },
    semana: { resumen: "Semana social con giros rápidos. Evitá comprometerte a todo; elegí 2 prioridades." }
  },
  {
    signo: "Cáncer",
    hoy: { amor: "Cuidado personal mejora el vínculo.",
           trabajo: "Organizá papeles y correos atrasados.",
           energia: "Sensibilidad alta; protegé límites." },
    semana: { resumen: "Orden doméstico y emocional. Pedí apoyo en lugar de cargar todo solo/a." }
  },
  {
    signo: "Leo",
    hoy: { amor: "Un plan espontáneo suma chispa.",
           trabajo: "Mostrá tu avance; pedí feedback claro.",
           energia: "Creativa; canalizala en algo concreto." },
    semana: { resumen: "Visibilidad en alza; cuidá la soberbia. Delegar multiplica resultados." }
  },
  {
    signo: "Virgo",
    hoy: { amor: "Rutina compartida fortalece el vínculo.",
           trabajo: "Checklist breve te libera la mente.",
           energia: "Estable; hidrátate mejor." },
    semana: { resumen: "Ajustes finos y hábitos. Evitá la autocrítica excesiva; celebra los progresos." }
  },
  {
    signo: "Libra",
    hoy: { amor: "Balance entre dar y pedir; sé claro/a.",
           trabajo: "Negociación favorecida; prepará datos.",
           energia: "Media; buscá armonía en el entorno." },
    semana: { resumen: "Puentes y acuerdos. No postergues decisiones por agradar a todos." }
  },
  {
    signo: "Escorpio",
    hoy: { amor: "Intensidad bien dirigida, conexión profunda.",
           trabajo: "Enfocate en algo difícil y cerralo.",
           energia: "Fuerte; evitá excesos." },
    semana: { resumen: "Transformación práctica: soltar un hábito mejora tu foco y descanso." }
  },
  {
    signo: "Sagitario",
    hoy: { amor: "Plan al aire libre renueva el ánimo.",
           trabajo: "Aprendizaje rápido; probá una herramienta.",
           energia: "Alta; movete con criterio." },
    semana: { resumen: "Horizonte amplio: cursos y viajes cortos. Evitá prometer más de lo posible." }
  },
  {
    signo: "Capricornio",
    hoy: { amor: "Límites claros traen calma.",
           trabajo: "Paso a paso y sin apuro: rendirá.",
           energia: "Sostenida; dormí bien." },
    semana: { resumen: "Estructura y metas realistas. Revisión financiera sencilla te ordena." }
  },
  {
    signo: "Acuario",
    hoy: { amor: "Conversación diferente, conexión distinta.",
           trabajo: "Pensá en mejora para el equipo.",
           energia: "Intermitente; pausas cortas ayudan." },
    semana: { resumen: "Innovación útil. Evitá discusiones teóricas eternas; llevá ideas a prueba." }
  },
  {
    signo: "Piscis",
    hoy: { amor: "Empatía sí, pero con límites sanos.",
           trabajo: "Creatividad aplicada a un problema real.",
           energia: "Emocional; anclate con hábitos simples." },
    semana: { resumen: "Intuición afinada; cuidado con confusiones. Anotá sueños/ideas y priorizá." }
  }
];
