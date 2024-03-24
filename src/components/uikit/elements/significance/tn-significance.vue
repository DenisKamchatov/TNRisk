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
    background-color: var(--significance-bg-hover);
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

  background-color: var(--significance-icon-bg);

  outline: var(--significance-icon-outline);
}

.tn-significance__icon_red {
  background-color: var(--significance-icon-red-bg);

  outline: var(--significance-icon-red-outline);
}

.tn-significance__icon_yellow {
  background-color: var(--significance-icon-yellow-bg);

  outline: var(--significance-icon-yellow-outline);
}

.tn-significance__icon_green {
  background-color: var(--significance-icon-green-bg);

  outline: var(--significance-icon-green-outline);
}

.tn-significance__label {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--significance-label);
}

</style>
