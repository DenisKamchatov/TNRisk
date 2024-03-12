export const DEFAULT_LOCALE = "ru";

export enum ISignificanceStatuses {
  red="red",
  yellow="yellow",
  green="green",
  empty="empty",
}

export interface ISignificanceLocateConfig {
  labels: {
    high: string;
    medium: string;
    low: string;
    none: string;
  };
}
