<script setup lang="ts">
import { computed, ref } from "vue";
import { translates } from "../translates";
import { DEFAULT_LOCALE } from "../typings";

const props = withDefaults(
  defineProps<{
    locale?: string;
  }>(),
  {
    locale: DEFAULT_LOCALE,
  }
);

const modelValue = defineModel("modelValue");

const monthLabels = computed(() => {
  return translates[props.locale].shortMonthLabels;
});

function onMonthClick(idx: number) {
  modelValue.value = idx;
}
</script>

<template>
  <div class="month-selector">
    <button class="month-selector__item"
      v-for="(month, index) in monthLabels" :key="`month-{index}`"
      @click="onMonthClick(index)">{{ month }}</button>
  </div>
</template>

<style lang="scss">
.month-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;

  max-width: 232px;
}

.month-selector__item {
  display: flex;
  height: 48px;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;

  border-radius: 12px;
  background-color: var(--Light-Gray-16, #E7E9EF);
  transition: all .15s 0s ease;

  &:hover {
    background-color: var(--Red-Red, #EB3B41);
    color: #fff;
  }
}
</style>
