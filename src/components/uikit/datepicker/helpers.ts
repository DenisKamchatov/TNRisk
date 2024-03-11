export const getYearList = (count: number = 100): number[] => {
  const arr: number[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - count; i <= count + currentYear; i++) {
    arr.push(i);
  }
  return arr;
};

export const getSelectedHour = (disabledHours: number[]): number => {
  if (disabledHours.length) {
    for (let hour = 0; hour < 24; hour++) {
      if (!disabledHours.includes(hour)) {
        return hour;
      }
    }
  }
  return 0;
};
