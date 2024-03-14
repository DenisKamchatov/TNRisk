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

  cursor: pointer;

  &:hover {
    z-index: 2;
    .drag-item__background {
      box-shadow: 0px 2px 8px 0px #2E384B14, 0px 0px 1px 0px #2E384B3D, 0px 6px 58px 0px #7991AD30;
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

  background-color: #fff;

  border-radius: 20px;
  z-index: -1;
  transition: 300ms;
}
</style>
