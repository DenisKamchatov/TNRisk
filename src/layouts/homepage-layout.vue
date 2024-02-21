<script setup lang="ts"></script>

<template>
  <div class="homepage-layout">
    <slot></slot>
    <div class="homepage-layout__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.homepage-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 96px 0 0 0;
}

.homepage-layout__footer {
  flex-grow: 0;
}
</style>
