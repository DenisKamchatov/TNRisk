import { IDatepickerLocateConfig } from "./typings";

export const translates = {
  ru: {
    shortWeekdayLabels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    shortMonthLabels: [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек"
    ],
    monthLabels: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    doneButtonLabel: "Готово",
  },
  en: {
    shortWeekdayLabels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    shortMonthLabels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    monthLabels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    doneButtonLabel: "Pick",
  }
} as {
  [key: string]: IDatepickerLocateConfig;
};
