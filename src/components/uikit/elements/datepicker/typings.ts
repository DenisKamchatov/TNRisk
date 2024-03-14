export const DEFAULT_LOCALE = "en";

export type IDisableDatesFn = (date: Date) => boolean;

export interface IDatepickerLocateConfig {
  monthLabels?: string[];
  shortWeekdayLabels?: string[];
  shortMonthLabels?: string[];
  doneButtonLabel?: string;
}

export interface IDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  isPrevMonth: boolean;
  isNextMonth: boolean;
}
