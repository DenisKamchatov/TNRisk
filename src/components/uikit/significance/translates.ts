// import { IDatepickerLocateConfig } from "./typings";
import { ISignificanceLocateConfig } from "./typings";
export const translates = {
  ru: {
    labels: {
      high: "Высокий",
      medium: "Средний",
      low: "Низкий",
      none: "Отсутствует",
    },
  },
  en: {
    labels: {
      high: "High",
      medium: "Medium",
      low: "Low",
      none: "None",
    },
  },
} as {
  [key: string]: ISignificanceLocateConfig;
};
