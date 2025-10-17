export type CardKind = "Weather" | "Dolar" | "Efemerides" | "NextFeriado";

export type BaseCard = {
  id: string;
  card: CardKind;
  title?: string;
};

export type AnyCard = BaseCard & Record<string, unknown>;
