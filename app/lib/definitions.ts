export type GameType = "under" | "over";

export interface StateInterface {
  errors?: Record<string, string[] | undefined>;
  message?: string | undefined;
  result: boolean | undefined;
  playNumber: number | undefined;
  type: GameType,
  num: number | undefined,
}

export interface ControlPanelProps {
  alertHandle: (state: boolean | undefined) => void;
}

export interface DiceGameRow {
  date: string;
  guess: string;
  playNumber: number | undefined;
  result: boolean | undefined;
}