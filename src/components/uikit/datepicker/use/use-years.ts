import { type Ref, computed } from "vue";

export function useYears(activeYear: Ref<number>) {
  const yearsPerRow = 12;
  const years = computed(() => {
    const result = [];
    for (let i = activeYear.value - 5; i <= activeYear.value + 6; i++) {
      result.push(i);
    }

    return result;
  });

  function prevYears() {
    activeYear.value -= yearsPerRow;
  }

  function nextYears() {
    activeYear.value += yearsPerRow;
  }

  return {
    years,
    prevYears,
    nextYears,
  }
}
