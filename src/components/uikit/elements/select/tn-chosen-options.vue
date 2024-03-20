<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useElementSize } from '@vueuse/core'
import { ITnSelectItem } from "./typings";

const props = withDefaults(
  defineProps<{
    selectInputWidth: number;
    items: ITnSelectItem[];
  }>(),
  {}
);

const emits = defineEmits(["delete"]);
const chosenItemsEl = ref<HTMLElement | null>(null);

const selectedItems = ref<ITnSelectItem[]>(props.items);
const { width } = useElementSize(chosenItemsEl)
const showedItemsCount = ref<number>(0)

const allItems = computed(() => {
  return props.items
})

const inputWidth = computed(() => {
  return props.selectInputWidth
})

watch([allItems, inputWidth], () => updateSelectedItems())

function updateSelectedItems() {
  showedItemsCount.value = Math.floor((inputWidth.value - 70) / 100)

  if (allItems.value.length <= showedItemsCount.value - 1) {
    selectedItems.value = allItems.value
  } else {
    selectedItems.value = allItems.value.toSpliced(showedItemsCount.value, allItems.value.length - showedItemsCount.value)
  }
}

</script>

<template>
  <div class="tn-input__chosen-items" ref="chosenItemsEl">
    <div class="tn-select__chosen-item" v-for="item in selectedItems" :key="item.id">
      <p>
        {{ item.label }}
      </p>
      <TNIcon
        name="x"
        class="tn-select__delete-icon"
        @click.stop="emits('delete', item)"
      />
    </div>

    <span class="tn-input__items-count" :style="{ left: width + 15 + 'px'}" v-if="allItems.length - selectedItems.length > 0">{{ '+' + (allItems.length - selectedItems.length) }}</span>
  </div>
</template>

<style lang="scss">

.tn-input__chosen-items {
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;

  transform: translateY(-50%);

  transition: 300ms;
}

.tn-select__chosen-item {
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  p {
    max-width: 80px;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tn-select__delete-icon {
    font-size: 16px;

    color: #9ea5b5;

    cursor: pointer;
  }
}

.tn-input__items-count {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}


</style>
