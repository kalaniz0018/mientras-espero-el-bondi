// Selección del próximo feriado y cálculo de estados

import { addOneYear, atMidnight, daysBetween, parseLocalDate } from "./FeriadoDate";

export type RawFeriado = { name: string; startDate: string; endDate?: string };
export type NormalizedFeriado = { name: string; start: Date; end: Date };

export const normalizeFeriados = (items: RawFeriado[]): NormalizedFeriado[] =>
  items
    .map((f) => {
      const start = atMidnight(parseLocalDate(f.startDate));
      const end = atMidnight(parseLocalDate(f.endDate ?? f.startDate));
      return { name: f.name, start, end };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());

export const rollToNextYear = (items: NormalizedFeriado[]): NormalizedFeriado[] =>
  items
    .map((f) => ({ ...f, start: addOneYear(f.start), end: addOneYear(f.end) }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

export type NextFeriadoResult = {
  next: NormalizedFeriado;
  isOngoing: boolean;
  isStartToday: boolean;
  isLastDay: boolean;
  durationDays: number;
  hasMultipleDays: boolean;
  daysToStart: number;
  daysToEnd: number;
};

export const getNextFeriadoData = (
  raw: RawFeriado[],
  today: Date
): NextFeriadoResult | null => {
  const normalized = normalizeFeriados(raw);

  // próximo >= hoy; si no hay, “roll” al año siguiente
  let next = normalized.find((f) => f.start.getTime() >= today.getTime());
  if (!next) next = rollToNextYear(normalized)[0];
  if (!next) return null;

  // Evitar “0 días” en futuros
  const daysToStartNow = Math.max(0, daysBetween(today, next.start));
  const isOngoingNow =
    today.getTime() >= next.start.getTime() && today.getTime() <= next.end.getTime();
  if (!isOngoingNow && daysToStartNow === 0) {
    const idx = normalized.findIndex((f) => f.start.getTime() === next!.start.getTime());
    next = normalized[idx + 1] ?? rollToNextYear(normalized)[0];
    if (!next) return null;
  }

  const isOngoing =
    today.getTime() >= next.start.getTime() && today.getTime() <= next.end.getTime();
  const isStartToday = today.getTime() === next.start.getTime();
  const isLastDay = today.getTime() === next.end.getTime();

  const durationDays = daysBetween(next.start, next.end) + 1;
  const hasMultipleDays = durationDays > 1;

  const daysToStart = Math.max(0, daysBetween(today, next.start));
  const daysToEnd = Math.max(0, daysBetween(today, next.end)) + 1;

  return {
    next,
    isOngoing,
    isStartToday,
    isLastDay,
    durationDays,
    hasMultipleDays,
    daysToStart,
    daysToEnd,
  };
};
