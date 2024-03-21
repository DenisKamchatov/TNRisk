<script setup lang="ts">
import { computed } from "vue";
import { TNMultiSelectProps } from "./typings";
import { ITnSelectItem } from "@/components/uikit/elements/select/typings";

import TnSelect from "@/components/uikit/elements/select/tn-select.vue";
import TnCheckbox from "@/components/uikit/elements/checkbox/tn-checkbox.vue";

const props = defineProps<TNMultiSelectProps<ITnSelectItem>>();

const modelValue = defineModel<ITnSelectItem[]>("modelValue", {
  default: [],
});

const outputOptions = computed(() => {
  return props.options;
});

function onSelect(item: ITnSelectItem | null) {
  if (item === null) {
    modelValue.value = [];
    return;
  }

  if (!item.id) {
    return;
  }

  if (modelValue.value.find((el) => el.id === item.id)) {
    modelValue.value = modelValue.value.filter((el) => el.id !== item.id);
    return;
  }

  modelValue.value = [...modelValue.value, item];
}

function onDelete(item: ITnSelectItem) {
  modelValue.value = modelValue.value.filter((el) => el.id !== item.id);
}
</script>

<template>
  <div class="tn-multi-select">
    <TnSelect
      :options="outputOptions"
      v-model="modelValue"
      :floating-label="floatingLabel"
      :placeholder="placeholder"
      :loading="loading"
      is-multiple
      block
      @select="onSelect"
      @delete="onDelete"

      :excludedSearchOptions="excludedSearchOptions"
      :label="label"
      :icon="icon"
      :error="error"
      :description="description"
      :hideDetails="hideDetails"
      :allowEmptySearch="allowEmptySearch"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :search="search"
      :search-placeholder="searchPlaceholder"
      :empty-search-result-text="emptySearchResultText"
      :scrollable="scrollable"

    >
      <template v-slot:option-item="slotOption">
        <div class="tn-multi-select__item">
          <TnCheckbox
            :key="slotOption.item.id"
            v-model="modelValue"
            :value="slotOption.item"
            :disabled="slotOption.item.disabled"
            style="pointer-events: none;"
          />

          <slot name="multi-select-item" v-bind="slotOption">
            <div class="tn-multi-select__item-name">
              {{ slotOption.item.label }}
            </div>
          </slot>
        </div>
      </template>
    </TnSelect>

    {{ modelValue }}
  </div>
</template>

<style lang="scss">
.tn-multi-select {
  width: 100%;
}
.tn-multi-select__item {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
