<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg" | "xl";
  }>(),
  {
    size: "md",
  }
);

defineEmits(["click"]);
</script>

<template>
  <div class="tn-loader">
    <div class="tn-loader__spinner"></div>
  </div>
</template>

<style lang="scss">
.tn-loader {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 1em;
  height: 1em;
}

.tn-loader__spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border: 0.1em solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  color: #ffffff;

  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;

  animation: tn-loader__spinner 1s linear infinite;
}

@keyframes tn-loader__spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
