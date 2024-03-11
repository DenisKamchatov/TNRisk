<script setup lang="ts">
import { type Ref, onMounted, ref } from "vue";
import { DEFAULT_LOCALE } from "../typings";

const props = withDefaults(
  defineProps<{
    locale: string;
    years: Ref<number[]>;
  }>(),
  {
    locale: DEFAULT_LOCALE,
  }
);

const modelValue = defineModel<number>("modelValue");

const currentYear = ref(new Date().getFullYear());

function onYearClick(year: number) {
  modelValue.value = year;
}

onMounted(() => {
  if (modelValue.value) {
    currentYear.value = modelValue.value;
  }
});
</script>

<template>
  <div class="years-selector" v-auto-animate>
    <button
      class="years-selector__item"
      :class="{
        'years-selector__item_selected': currentYear === modelValue,
      }"
      v-for="(year, index) in years.value"
      :key="`year-${year}`"
      @click="onYearClick(year)"
    >{{ year }}</button>
  </div>
</template>

<style lang="scss">
.years-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;

  width: 232px;
}

.years-selector__item {
  display: flex;
  padding: 8px 14px;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;

  padding: 10px;

  border-radius: 8px;
  background-color: var(--Light-Gray-16, #E7E9EF);
  cursor: pointer;
  transition: all .15s 0s ease;

  &:hover {
    background-color: var(--Red-Red, #EB3B41);
    color: #fff;
  }
}

.years-selector__item_selected {
  background-color: var(--Red-Red, #EB3B41);
  color: #fff;
}
</style>
