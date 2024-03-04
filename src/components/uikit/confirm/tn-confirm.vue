<script setup lang="ts">
import { ref } from "vue";
import TnDialog from "../dialog/tn-dialog.vue";
import TnButton from "../button/tn-button.vue";
import TnConfirmHeader from "./tn-confirm-header.vue";

const props = withDefaults(
  defineProps<{
    title: string;
    subtitle: string;
  }>(),
  {
    subtitle: "",
  }
);

let _resolve: any = () => {};
let _reject: any = () => {};

function open() {
  isOpen.value = true;

  return new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  }).finally(() => {
    isOpen.value = false;
  });
}

defineExpose({
  open,
});

const isOpen = ref(false);

function onReject() {
  _resolve(false);
  close();
}
function onResolve() {
  _resolve(true);
  close();
}

function close() {
  _resolve(false);
  isOpen.value = false;
}
</script>

<template>
  <TnDialog v-if="isOpen" @close="close" class="tn-confirm" position="top">
    <template #header>
      <div class="tn-confirm__header">
        <slot name="header">
          <TnConfirmHeader :title="title" :subtitle="subtitle" />
        </slot>
      </div>

    </template>
    <slot></slot>
    <template #footer>
      <div class="tn-confirm__buttons">
        <slot name="buttons" :reject="onReject" :resolve="onResolve">
          <TnButton secondary v-focus @click="onReject">Отмена</TnButton>
          <TnButton primary @click="onResolve">Ок</TnButton>
        </slot>
      </div>
    </template>
  </TnDialog>
</template>

<style lang="scss">
.tn-confirm__header {
  position: relative;
  display: flex;
  flex-direction: column;

  padding: 24px 24px 16px 24px;

  border-bottom: 1px solid #E7E9EF;
}
.tn-confirm__buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
}

.tn-confirm .tn-dialog__container {
  max-width: 336px;
  width: 100%;
}
</style>
