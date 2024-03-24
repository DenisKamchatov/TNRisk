<script setup lang="ts">

</script>

<template>
  <div class="function-bar">
    <div class="function-bar__left-bar">
      <slot>

      </slot>
    </div>

    <div class="function-bar__right-bar">
      <slot name="right-bar">

      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.function-bar {
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
.function-bar__left-bar, .function-bar__right-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
