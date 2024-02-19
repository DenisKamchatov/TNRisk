<script setup lang="ts">
import { onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    closeable?: boolean;
  }>(),
  {
    title: undefined,
    closeable: true,
  }
);

defineEmits(["click"]);

onMounted(() => {
  console.log("th-dialog-header: mounted");
});
</script>

<template>
  <div
    class="th-dialog-header"
    :class="{ 'th-dialog-header_closeable': closeable }"
  >
    <div class="th-dialog-header__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="th-dialog-header__buttons">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.th-dialog-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 24px;
}

.th-dialog-header__buttons {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.th-dialog-header_closeable {
  .th-dialog-header__buttons {
    right: 32px;
  }
}
</style>
