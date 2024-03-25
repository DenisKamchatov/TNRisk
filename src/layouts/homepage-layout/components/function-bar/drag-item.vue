<script setup lang="ts">
import TNIcon from "@/components/uikit/elements/icons/tn-icon.vue";

</script>

<template>
  <div class="drap-item">
    <TNIcon name="grip-vertical" />
    <slot></slot>

    <div class="drag-item__background"></div>
  </div>
</template>

<style lang="scss">
.drap-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1;

  cursor: grab;

  &:hover {
    z-index: 2;
    .drag-item__background {
      background-color: var(--function-bar-drag-item-bg);
      box-shadow: var(--function-bar-drag-item-shadow-hover);
      transition: 300ms;
    }

  }
}

.drag-item__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  transform: scale(1.06, 1.33);


  border-radius: 20px;
  z-index: -1;
  transition: 300ms;
}

.drap-item-ghost {
  cursor: grabbing;

  .drag-item__background {
    background-color: var(--function-bar-drag-item-bg);

    box-shadow: var(--function-bar-drag-item-shadow-hover);
    transition: 300ms;
  }
}
</style>
