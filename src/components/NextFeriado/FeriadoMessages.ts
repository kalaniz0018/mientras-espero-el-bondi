// Mensajes cortos y título dinámico

type TitleParams = { isOngoing: boolean; isStartToday: boolean; name: string };
type MsgParams = {
  isOngoing: boolean;
  isStartToday: boolean;
  isLastDay: boolean;
  name: string;
  durationDays: number;
};

export const buildFeriadoTitle = ({ isOngoing, isStartToday, name }: TitleParams) => {
  if (isOngoing && isStartToday) return `🎉 ¡Hoy es ${name}!`;     // día 1
  if (isOngoing) return `🎉 ${name}`;                              // en curso (no día 1)
  return "Próximo feriado";                                        // futuro
};

export const buildFeriadoMessage = ({
  isOngoing,
  isStartToday,
  isLastDay,
  name,
  durationDays,
}: MsgParams) => {
  if (isOngoing && isStartToday) {
    // saludo corto por ocasión (ejemplos simples)
    if (/navidad/i.test(name)) return "¡Feliz Navidad! 🎄 Disfrutá con los tuyos.";
    if (/año nuevo/i.test(name)) return "¡Feliz Año! ✨";
    if (/carnaval/i.test(name)) return "¡A disfrutar del Carnaval! 🎭";
    if (/bandera/i.test(name)) return "Orgullo celeste y blanco. 🇦🇷";
    return "¡A disfrutar del día libre! ✨";
  }

  if (isOngoing) {
    if (isLastDay) return "Último día de feriado · ¡Aprovechalo! ✨";
    return durationDays > 1 ? "Feriado largo en marcha" : "Feriado en marcha";
  }

  // Futuro: dejamos solo countdown + fecha para no sobrecargar
  return "";
};
