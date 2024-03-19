<script setup lang="ts">
import { computed, ref, watch, watchEffect, nextTick } from "vue";
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
const chosenItems = ref<HTMLElement | null>(null);
// const shownItems = ref<ITnSelectItem[]>(props.items)

// const countHiddenItems = computed(() => {
//   return props.items.length - shownItems.value.length
// })

// const { width } = useElementSize(chosenItems)

// watch(width, async () => {
//   if (width.value > props.selectInputWidth - 95) {
//     console.log('DONE!!', width.value)
//     await nextTick()
//     const item = shownItems.value.pop()
//     console.log('items', item)

//   }
// })

</script>

<template>
  <div class="tn-input__chosen-items" ref="chosenItems">
    <div class="tn-select__chosen-item" v-for="item in items" :key="item.id">
      <p>
        {{ item.label }}
      </p>
      <TNIcon
        name="x"
        class="tn-select__delete-icon"
        @click="emits('delete', item)"
      />
    </div>
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
  width: fit-content;
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
    pointer-events: none;
    white-space: nowrap;
  }

  .tn-select__delete-icon {
    font-size: 16px;

    color: #9ea5b5;

    cursor: pointer;
  }
}


</style>
