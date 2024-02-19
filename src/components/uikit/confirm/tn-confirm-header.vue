<script setup lang="ts">
import { onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
  }>(),
  {
    subtitle: "",
  }
);

defineEmits(["click"]);

onMounted(() => {
  console.log("tn-confirm-header: mounted");
});
</script>

<template>
  <div class="tn-confirm-header">
    <i>tn-confirm-header</i>
  </div>
</template>

<style lang="scss">
.tn-confirm-header {
  /**/
}
</style>
