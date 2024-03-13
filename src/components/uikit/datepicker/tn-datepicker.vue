<script setup lang="ts">
import { computed, ref } from 'vue';
import { Dropdown } from 'floating-vue';
import TnCalendar from './tn-calendar.vue';
import TnInput from '../input/tn-input.vue';
import { IDatepickerLocateConfig, IDisableDatesFn } from './typings';

const props = withDefaults(
  defineProps<{
    size?: "s" | "m";
    disabled?: boolean;
    description?: string;
    label?: string;
    floatingLabel?: string;
    range?: boolean;
    locale?: string;
    customLocale?: IDatepickerLocateConfig;
    time?: boolean;
    required?: boolean;
    error?: string;
    warn?: string;
    success?: string;
    isMobileMiniApp?: boolean;
    yearRange?: number | string;
    disabledDates?: Date[] | IDisableDatesFn;
    disabledHours?: number[];
    minuteStep?: number | string;
    maxDaysRange?: number | string;
    confirm?: boolean;
    alwaysBottom?: boolean;
    bottomSheetCustomClass?: string;
    mobileBreakPoint?: number | string;
    selectionMode?: "range" | "single";
  }>(),
  {
    size: "m",
    range: false,
    time: false,
    disabledDates: () => [],
    disabledHours: () => [],
    minuteStep: 1,
    maxDaysRange: 0,
    mobileBreakPoint: 768,
    confirm: false,
    alwaysBottom: false,
    bottomSheetCustomClass: "",
    isMobileMiniApp: false,
    locale: "ru",
    customLocale: undefined,
    selectionMode: "single",
  }
);

const modelValue = defineModel<(Date | null)[] | Date | null>({
  default: null,
});

const emit = defineEmits(["open", "close"]);

const isMobile = ref<boolean>(false);

const textInputValue = computed<string>(() => {
  const placeholder = "__.__.____";
  const separator = "–";
  // const timeFormat = " __:__";
  const value = modelValue.value;
  if (value) {
    if (Array.isArray(value) && props.range) {
      const dateFrom = value[0];
      const dateTo = value[1];
      let dateFromString = dateFrom ? `${formatDate(dateFrom)}` : placeholder;
      let dateToString = dateTo ? `${formatDate(dateTo)}` : placeholder;
      console.log("Array.isArray", `${dateFromString} ${separator} ${dateToString}`);
      return `${dateFromString} ${separator} ${dateToString}`;
    } else if (!Array.isArray(value)) {
      console.log("!Array.isArray", `${formatDate(value)}${props.time ? ` ${formatTime(value)}` : ""}`);
      return `${formatDate(value)}${props.time ? ` ${formatTime(value)}` : ""}`;
    }
  }
  if (props.range) {
    return `${placeholder} ${separator} ${placeholder}`;
  }
  return placeholder;
});

function formatDate(date: Date): string {
  const day = prettifyNumber(date.getDate());
  const month = prettifyNumber(date.getMonth() + 1);
  const year = prettifyNumber(date.getFullYear());
  return `${day}.${month}.${year}`;
}

function formatTime(date: Date): string {
  const hours = prettifyNumber(date.getHours());
  const minutes = prettifyNumber(date.getMinutes());
  return ` ${hours}:${minutes}`;
}

function prettifyNumber(number: number): string {
  return number < 10 ? "0" + number : String(number);
}

function onUpdateModelValue(date: (Date | null)[] | Date | null) {
  modelValue.value = date;
  if (!props.range && !props.time) {
    return;
  }
}

function clearValue() {
  modelValue.value = null;
  if (!props.range && !props.time) {
    return;
  }
}

function setShown(v: boolean) {
  console.log("setShown", v);
}

</script>

<template>
  <div class="tn-datepicker">
    <Dropdown no-auto-focus :placement="`bottom-start`">
      <TnInput
        :label="label"
        :floatingLabel="floatingLabel"
        v-model="textInputValue"
        clearable @clear="clearValue"
        readonly
        :required="required"
        :warn="warn"
        :success="success"
        :description="description"
      />
      <template #popper="{ shown }">
        <TnCalendar
          :data-shown="setShown(shown)"
          class="tn-datepicker__calendar"
          v-model="modelValue"
          :selectionMode="selectionMode"
          :locale="locale"
        />
      </template>
    </Dropdown>
  </div>
</template>

<style lang="scss">
.tn-datepicker {
  position: relative;
  font-family: "Proxima Nova", sans-serif, system-ui;
  width: 308px;
}

.tn-datepicker__label {
  display: block;
  font-weight: 600;
  color: var(--content-primary-a-enabled);
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 16px;
  cursor: default;
}

.tn-datepicker_required .tn-datepicker__label:after {
  content: "*";
  color: var(--content-accent-enabled);
  margin-left: 2px;
}

.tn-datepicker__description {
  color: var(--content-primary-a-enabled);
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 10px;
}

.tn-datepicker__error {
  padding-top: 6px;
  color: var(--content-system-negative);
  font-size: 14px;
  line-height: 16px;
}

.tn-datepicker__success {
  padding-top: 6px;
  color: var(--content-system-positive);
  font-size: 14px;
  line-height: 16px;
}

.tn-datepicker__warn {
  padding-top: 4px;
  color: var(--content-system-warning);
  font-size: 14px;
  line-height: 16px;
}

.tn-datepicker__inner-input {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  background-color: var(--background-primary-a-enabled);
  border: 1px solid var(--border-secondary-enabled);
  border-radius: 10px;
  padding: 0 16px;
  outline: none;
  font-size: 16px;
  color: var(--content-primary-a-enabled);
  transition: 0.3s;
  box-sizing: border-box;
}

.tn-datepicker__inner-input_disabled,
.tn-datepicker__inner-input_disabled:hover {
  background-color: var(--background-primary-a-disabled);
  pointer-events: none;
  border-color: var(--background-accent-disabled);
  color: var(--content-primary-a-disabled);
}

.tn-datepicker__inner-input_error {
  border-color: var(--content-accent-enabled);
}

.tn-datepicker__inner-input_success {
  border-color: var(--content-system-positive);
}

.tn-datepicker__inner-input_medium {
  height: 48px;
}

.tn-datepicker__inner-input.tn-datepicker__inner-input_open {
  border-color: var(--border-secondary-pressed);
}

.tn-datepicker__inner-input.tn-datepicker__inner-input_open.tn-datepicker__inner-input_error {
  border-color: var(--background-accent-hover);
}

.tn-datepicker__inner-input.tn-datepicker__inner-input_open.tn-datepicker__inner-input_success {
  border-color: var(--content-system-positive);
}

.tn-datepicker__inner-input-value {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.tn-datepicker__inner-input-value .tn-datepicker__placeholder {
  color: var(--content-secondary-enabled);
}

.tn-button.tn-datepicker__inner-clear {
  position: absolute;
  width: 20px;
  height: 20px;
  padding: 0;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--content-tertiary-enabled);
  transition: filter 0.1s linear;
  border: none;
}

.tn-button.tn-datepicker__inner-clear:hover {
  color: var(--content-tertiary-enabled);
  filter: brightness(0.9);
}

.tn-button.tn-datepicker__inner-clear:active {
  color: var(--content-tertiary-enabled);
  filter: brightness(0.8);
}

.tn-datepicker__inner-clear .tn-icon,
.tn-datepicker__inner-clear .tn-icon svg {
  width: 20px !important;
  height: 20px !important;
  line-height: 20px !important;
}

.tn-datepicker__inner-icon {
  top: 7px;
  font-size: 24px;
  position: absolute;
  right: 15px;
  display: flex;
  color: var(--content-tertiary-enabled);
}

.tn-datepicker__inner-input_medium .tn-datepicker__inner-icon {
  top: 11px;
}

.tn-datepicker__wrapper-desktop {
  border: 1px solid var(--background-primary-a-enabled);
  position: absolute;
  left: 0;
  transform: translateY(100%);
  bottom: -6px;
  border-radius: 12px;
  background-color: var(--background-primary-a-enabled);
  box-shadow: var(--shadow-small);
  overflow: auto;
  z-index: 10;
}

.tn-datepicker__wrapper-desktop_range {
  width: 616px;
  display: flex;
  justify-content: space-between;
}

.tn-datepicker__wrapper-desktop_bottom {
  bottom: unset;
  top: -6px;
  transform: translateY(-100%);
}

.tn-datepicker__wrapper-desktop_right {
  left: unset;
  right: 0;
}

.tn-datepicker__calendar_bottom-sheet {
  margin: 0 -16px;
  width: calc(100% + 32px);
  padding-bottom: 32px;
}

.tn-datepicker__footer-button {
  margin-bottom: 16px;
}

</style>
