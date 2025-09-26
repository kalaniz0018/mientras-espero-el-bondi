// Helpers de fecha bien declarativos

export const atMidnight = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const parseLocalDate = (s: string) => {
  // "YYYY-MM-DD" -> Date (local)
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const addOneYear = (d: Date) =>
  new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());

export const daysBetween = (a: Date, b: Date) =>
  Math.round((atMidnight(b).getTime() - atMidnight(a).getTime()) / 86400000);

export const formatLargo = (d: Date) =>
  d.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export const isSameDay = (a: Date, b: Date) => atMidnight(a).getTime() === atMidnight(b).getTime();
