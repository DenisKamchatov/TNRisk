<script setup lang="ts">
import { useSlots, ref } from 'vue';
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from "@/layouts/homepage-layout/components/function-bar/helpers";

const slots = useSlots();

const items = ref(slots["default"]?.() || []);
console.log(items.value)

// TODO: Удалить компонент
</script>

<template>
  <div class="function-bar-draggable">
    <div class="function-bar-draggable__left-bar">
        <slot>

        </slot>
    </div>

    <div class="function-bar-draggable__right-bar">
      <slot name="right-bar">

      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.function-bar-draggable {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  min-height: 72px;
  padding: 12px;

  background-color: var(--function-bar-bg);

  border-radius: 24px;

}
.function-bar-draggable__left-bar, .function-bar-draggable__right-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
