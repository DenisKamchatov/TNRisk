import { computed, type Ref, ref, watch } from "vue";
import { useYears } from "./use-years";

export function useCalendar(date: Ref<Date>) {

  const activeYear = ref(date.value.getFullYear());
  const activeMonth = ref(date.value.getMonth());
  const activeDay = ref(date.value.getDate());

  const years = useYears(activeYear);

  const activeDate = computed<Date>(() => {
    return new Date(activeYear.value, activeMonth.value, activeDay.value);
  });

  watch(date, (v) => {
    activeYear.value = v.getFullYear();
    activeMonth.value = v.getMonth();
    activeDay.value = v.getDate();
  });

  /**
   * Список дней отображаемого месяца
   */
  const days = computed(() => {
    const days = [];
    /**
     * Первый день текущего месяца
     */
    const firstDay = new Date(activeDate.value.getFullYear(), activeDate.value.getMonth(), 1);
    /**
     * Последний день текущего месяца
     */
    const lastDay = new Date(activeDate.value.getFullYear(), activeDate.value.getMonth() + 1, 0);
    /**
     * Последний день предыдущего месяца
     */
    const prevMonthLastDay = new Date(activeDate.value.getFullYear(), activeDate.value.getMonth(), 0);

    /**
     * Индекс первого дня текущего месяца
     */
    let startDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    /**
     * Индекс первого дня текущего месяца
     */
    let endDay = lastDay.getDate();

    /**
     * Дни предыдущего месяца
     */
    for (let i = startDayIndex; i > 0; i--) {
      const year = prevMonthLastDay.getFullYear();
      const month = prevMonthLastDay.getMonth();
      const day = prevMonthLastDay.getDate() - i + 1;

      days.push({
        date: new Date(year, month, day),
        year,
        month,
        day,
        isPrevMonth: true,
        isNextMonth: false,
      });
    }

    /**
     * Дни активного месяца
     */
    for (let i = 1; i <= endDay; i++) {
      const year = activeDate.value.getFullYear();
      const month = activeDate.value.getMonth();
      const day = i;

      days.push({
        date: new Date(year, month, day),
        year,
        month,
        day,
        isPrevMonth: false,
        isNextMonth: false,
      });
    }

    /**
     * Дни следующего месяца
     */
    let nextMonthDays = 42 - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const month = activeDate.value.getMonth() + 1 > 11 ? 0 : activeDate.value.getMonth() + 1;
      const year = (month === 0) ? activeDate.value.getFullYear() + 1 : activeDate.value.getFullYear();
      const day = i;

      days.push({
        date: new Date(year, month, day),
        year,
        month,
        day,
        isPrevMonth: false,
        isNextMonth: true,
      });
    }

    return days;
  });

  function prevMonth() {
    if (activeMonth.value - 1 < 0) {
      activeMonth.value = 11;
      activeYear.value -= 1;
    }

    activeMonth.value -= 1;
  }
  function nextMonth() {
    if (activeMonth.value + 1 > 11) {
      activeMonth.value = 0;
      activeYear.value +=1;
    }

    activeMonth.value += 1;
  }

  function prevYear() {
    activeYear.value -=1;
  }

  function nextYear() {
    activeYear.value +=1;
  }

  function setMonth(idx: number) {
    activeMonth.value = idx;
  }

  function setYear(year: number) {
    activeYear.value = year;
  }

  return {
    days,
    year: activeYear,
    month: activeMonth,
    day: activeDay,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    setMonth,
    setYear,

    years: years.years,
    prevYears: years.prevYears,
    nextYears: years.nextYears,
  }
}
