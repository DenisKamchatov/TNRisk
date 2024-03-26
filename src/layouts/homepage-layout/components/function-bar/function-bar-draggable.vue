<script setup lang="ts">
import { useSlots, ref } from 'vue';
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from "@/layouts/homepage-layout/components/function-bar/helpers";

const emits = defineEmits(["onDrop"]);

</script>

<template>
  <div class="function-bar-draggable">
    <div class="function-bar-draggable__left-bar">
      <Container @drop="emits('onDrop', $event)" orientation="horizontal" behaviour="contain" drag-class="drap-item-ghost" drop-class="drap-item">
        <slot name="draggable">

        </slot>
      </Container>
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
