<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import TnIcon from "../icons/tn-icon.vue";
import { IDay, DEFAULT_LOCALE } from "./typings";
import { useCalendar } from "./use/use-calendar";
import MonthsSelector from "./components/months-selector.vue";
import YearsSelector from "./components/years-selector.vue";
import { translates } from "./translates";

const props = withDefaults(
  defineProps<{
    locale: string;
    otherMonthActive: boolean;
    otherMonthVisible: boolean;
    selectionMode?: "multiple" | "range" | "single";
  }>(),
  {
    locale: DEFAULT_LOCALE,
    otherMonthActive: true,
    otherMonthVisible: true,
    selectionMode: "single",
  }
);

const modelValue = defineModel<Date | Date[] | null | (Date | null)[]>("modelValue", {
  default: null,
});

const currentDate = ref(new Date());
const calendar = useCalendar(currentDate);

const weekdayLabels = computed(() => {
  return translates[props.locale].shortWeekdayLabels;
});

const monthLabels = computed(() => {
  return translates[props.locale].monthLabels;
});

const yearTitle = computed(() => {
  if (mode.value !== CALENDAR_MODES.YEARS) {
    return calendar.year;
  }

  const list = calendar.years.value;
  return `${list[0]} - ${list[list.length - 1]}`;
});

const isRange = computed(() => {
  return props.selectionMode === "range" && Array.isArray(modelValue.value)
});

watch(modelValue, (v) => {
  if (Array.isArray(v)) {
    currentDate.value = v[0] ?? v[1] ?? new Date();
    return;
  }

  currentDate.value = v as Date || new Date();
}, {
  immediate: true,
  deep: true,
});

enum CALENDAR_MODES {
  DAYS = 1,
  MONTHS = 2,
  YEARS = 3,
}

const mode = ref<CALENDAR_MODES>(CALENDAR_MODES.DAYS);

function onMonthSelect(idx: number) {
  calendar.setMonth(idx);
  mode.value = CALENDAR_MODES.DAYS;
}

function onYearSelect(year: number) {
  calendar.setYear(year);
  mode.value = CALENDAR_MODES.MONTHS;
}

function onDayClick(day: IDay) {
  if (!props.otherMonthActive && (day.isPrevMonth || day.isNextMonth)) {
    return;
  }

  const newDate = new Date(day.year, day.month, day.day);

  if (!isRange.value) {
    modelValue.value = newDate;
    return;
  }

  modelValue.value = (modelValue.value ?? []) as Date[];
  const length = (modelValue.value as Date[]).length;

  if (length > 1) {
    modelValue.value = [newDate];
  }

  if (!length) {
    modelValue.value.push(newDate);
    return;
  }

  if (length === 1) {
    const date = modelValue.value[0];

    if (!date) {
      return;
    }

    if (date.getTime() < newDate.getTime()) {
      modelValue.value.push(newDate);
    } else if (date.getTime() > newDate.getTime()) {
      modelValue.value.unshift(newDate);
    } else {
      return;
    }
  }
}

function checkDaySelected(day: IDay) {
  if (isRange.value && Array.isArray(modelValue.value) && modelValue.value.length) {

    return !!modelValue.value.find((el) => {
      return el && day.date.getTime() === el.getTime();
    });
  }

  return day.date.getTime() === currentDate.value.getTime();
}

function onClickPrevYear() {
  if (mode.value === CALENDAR_MODES.YEARS) {
    return calendar.prevYears();
  }
  calendar.prevYear();
}

function onClickNextYear() {
  if (mode.value === CALENDAR_MODES.YEARS) {
    return calendar.nextYears();
  }
  calendar.nextYear();
}

function isToday(day?: IDay): boolean {
  return (
    !!day &&
    day.year === new Date().getFullYear() &&
    day.month === new Date().getMonth() &&
    day.day === new Date().getDate()
  );
}

function inRange(day?: IDay): boolean {
  if (!Array.isArray(modelValue.value)) {
    return false;
  }

  if (
    !day ||
    !isRange.value ||
    !modelValue.value?.length ||
    modelValue.value.length < 2
  ) {
    return false;
  }

  if (modelValue.value.length === 2) {
    const mvTime1 = modelValue.value[0]?.getTime();
    const mvTime2 = modelValue.value[1]?.getTime();
    return !!(mvTime1 && mvTime2 && mvTime1 <= day.date.getTime() && mvTime2 >= day.date.getTime());
  }

  return false;
}

function isStartOfRange(day: IDay) {
  if (!Array.isArray(modelValue.value)) {
    return false;
  }

  if (!isRange.value || !modelValue.value.length || modelValue.value.length !== 2) {
    return false;
  }

  return day.date.getTime() === modelValue.value[0]?.getTime();
}

function isEndOfRange(day: IDay) {
  if (!Array.isArray(modelValue.value)) {
    return false;
  }
  if (!isRange.value || !modelValue.value.length || modelValue.value.length !== 2) {
    return false;
  }

  return day.date.getTime() === modelValue.value[1]?.getTime();
}

const isFooterVisible = ref(false);

onMounted(() => {
  //
});
</script>

<template>
  <div class="tn-calendar">
    <div class="tn-calendar__head">
      <div class="tn-calendar__head-section">
        <button class="tn-calendar__head-arrow" @click="onClickPrevYear">
          <TnIcon name="chevrons-left" />
        </button>
        <button v-if="mode === CALENDAR_MODES.DAYS" class="tn-calendar__head-arrow" @click="calendar.prevMonth">
          <TnIcon name="chevron-left" />
        </button>
      </div>
      <div class="tn-calendar__head-section">
        <button
          v-if="mode === CALENDAR_MODES.DAYS"
          @click="mode = CALENDAR_MODES.MONTHS"
          class="tn-calendar__month"
        >{{ monthLabels && monthLabels[calendar.month.value] }}</button>
        <button
          class="tn-calendar__year"
          @click="mode = CALENDAR_MODES.YEARS"
        >{{ yearTitle }}</button>
      </div>
      <div class="tn-calendar__head-section">
        <button v-if="mode === CALENDAR_MODES.DAYS" class="tn-calendar__head-arrow" @click="calendar.nextMonth">
          <TnIcon name="chevron-right" />
        </button>
        <button class="tn-calendar__head-arrow" @click="onClickNextYear">
          <TnIcon name="chevrons-right" />
        </button>
      </div>
    </div>

    <div class="tn-calendar__body" v-auto-animate>
      <div class="tn-calendar__weekdays" v-if="mode === CALENDAR_MODES.DAYS">
        <div v-for="weekday in weekdayLabels" :key="weekday" class="weekday">{{ weekday }}</div>
      </div>
      <div class="tn-calendar__days" v-auto-animate v-if="mode === CALENDAR_MODES.DAYS">
        <div class="tn-calendar__day"
          v-for="day in calendar.days.value"
          :key="JSON.stringify(day)"
        >
          <button
            class="tn-calendar__daybtn"
            :class="{
              'prev-month': day.isPrevMonth,
              'next-month': day.isNextMonth,
              'tn-calendar__day_selected': checkDaySelected(day),
              'tn-calendar__day_today': isToday(day),
              'tn-calendar__day_range': inRange(day),
              'tn-calendar__day_start-of-range': isStartOfRange(day),
              'tn-calendar__day_end-of-range': isEndOfRange(day),
            }"
            @click="onDayClick(day)"
          >
            <span>{{ day.day }}</span>
          </button>
        </div>
      </div>
      <MonthsSelector
        v-if="mode === CALENDAR_MODES.MONTHS"
        :value="calendar.month"
        @update:modelValue="onMonthSelect"
        :locale="props.locale"
      />
      <YearsSelector
        v-if="mode === CALENDAR_MODES.YEARS"
        :value="calendar.year"
        :years="calendar.years"
        @update:modelValue="onYearSelect"
      />
    </div>

    <div class="tn-calendar__footer" v-if="isFooterVisible"></div>
  </div>
</template>

<style lang="scss">
.tn-calendar {
  display: flex;
  flex-direction: column;
  gap: 12px;

  min-width: 256px;
  padding: 12px;

  border: 1px solid #eee;
  border-radius: 16px;

  background-color: #fff;
}

.tn-calendar__head {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 8px;

  height: 24px;
}

.tn-calendar__head-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
}

.tn-calendar__head-arrow {
  font-size: 24px;
  color: #9EA5B5;
}

.tn-calendar__year {
  font-variant-numeric: lining-nums proportional-nums;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--Text-Title, #171C25);
}

.tn-calendar__month {
  font-variant-numeric: lining-nums proportional-nums;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--Text-Title, #171C25);
}

.tn-calendar__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tn-calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.tn-calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.tn-calendar__day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  max-width: 28px;
  max-height: 28px;
}

.tn-calendar__daybtn {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;

  color: var(--Text-Body, #2E384B);
  font-variant-numeric: lining-nums proportional-nums;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  transition: all .15s 0s ease;

  &:before {
    content: '';
    display: block;
    position: absolute;

    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;

    z-index: 0;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    z-index: 1;

    transition: all .15s 0s ease;
  }

  &:hover {
    span {
      background-color: var(--Light-Gray-16, #E7E9EF);
    }
  }
}

.tn-calendar__day_selected {
  span {
    background-color: var(--Red-Red, #EB3B41);
    color: #fff;
  }

  &:hover {
    span {
      background-color: var(--Red-Red, #EB3B41);
      color: #fff;
    }
  }
}

.tn-calendar__day_today {
  span {
    border: 1px solid var(--Red-Red, #EB3B41);
  }
}

.tn-calendar__day_range {
  background-color: var(--Red-Red-weak, #FCDDDE);
  color: var(--Text-Red, #D91921);

  &:hover {
    span {
      background-color: var(--Red-Red-weak, #ff878b);
      color: #fff;
    }
  }

  &:after {
    content: '';
    display: block;
    position: absolute;

    top: 0;
    left: -3px;
    right: -3px;
    bottom: 0;

    z-index: 0;

    background-color: var(--Red-Red-weak, #FCDDDE);
  }

  &.tn-calendar__day_start-of-range {
    &:after {
      left: 50%;
    }
  }

  &.tn-calendar__day_end-of-range {
    &:after {
      right: 50%;
    }
  }
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.weekday {
  text-align: center;
}

.prev-month {
  color: var(--Text-Grey, #747C8C);

  &:hover {
    color: var(--Text-Body, #2E384B);
  }
}

.next-month {
  color: var(--Text-Grey, #747C8C);

  &:hover {
    color: var(--Text-Body, #2E384B);
  }
}
</style>
