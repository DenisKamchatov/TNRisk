<script setup lang="ts">
import { defineModel, computed } from 'vue'
import { ISignificanceStatuses, DEFAULT_LOCALE } from './typings'
import { translates } from "./translates";

const props = withDefaults(
  defineProps<{
    shownLabel?: boolean,
    disabled?: boolean,
    value?: ISignificanceStatuses | null,
    shownTooltip?: boolean,
    locale: string,
  }>(),
  {
    shownLabel: true,
    shownTooltip: true,
    locale: DEFAULT_LOCALE
  }
);

const label = computed(() => {
  return props.value === ISignificanceStatuses.red
      ? translates[props.locale].labels.high
      : props.value === ISignificanceStatuses.yellow
      ? translates[props.locale].labels.medium
      : props.value === ISignificanceStatuses.green
      ? translates[props.locale].labels.low
      : props.value === ISignificanceStatuses.empty
      ? translates[props.locale].labels.none
      : ''
})

const tooltipOutput = computed(() => {
  return !props.disabled && props.shownTooltip ? label.value : ''
})

</script>

<template>
  <div
    class="tn-significance"
    :class="{
      'tn-significance_disabled': disabled
    }"
  >
    <div
      class="tn-significance__icon"
      :class="{
        'tn-significance__icon_red': value === 'red',
        'tn-significance__icon_yellow': value === 'yellow',
        'tn-significance__icon_green': value === 'green',
      }"
      v-tooltip="tooltipOutput"
    ></div>

    <p class="tn-significance__label" v-if="shownLabel">{{
      label
    }}</p>
  </div>
</template>

<style lang="scss">
.tn-significance {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 14px 12px;

  border-radius: 12px;

  cursor: pointer;
  transition: 300ms;
  &:hover {
    background-color: rgba(245, 246, 250, 1);
    transition: 300ms;
  }
}

.tn-significance_disabled {
  opacity: 0.5;
  cursor: default;

  &:hover {
    background-color: transparent;
  }
}

.tn-significance__icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background-color: rgba(182, 188, 200, 0.85);

  outline: 3px solid rgba(155, 159, 169, 0.2);
}

.tn-significance__icon_red {
  background-color: rgba(235, 59, 65, 0.85);

  outline: 3px solid rgba(235, 59, 65, 0.2);
}

.tn-significance__icon_yellow {
  background-color: rgba(255, 165, 0, 0.85);

  outline: 3px solid rgba(255, 165, 0, 0.2);
}

.tn-significance__icon_green {
  background-color: rgba(36, 180, 122, 0.85);

  outline: 3px solid rgba(36, 180, 122, 0.2);
}

.tn-significance__label {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #000000;
}

</style>
