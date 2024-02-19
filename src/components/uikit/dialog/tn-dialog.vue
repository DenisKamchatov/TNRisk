<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import TnButton from "../button/tn-button.vue";

const props = withDefaults(
  defineProps<{
    /**
     * Отрисовывать крестик для закрытия
     */
    closeable?: boolean;
    /**
     * Запретить закрытие по клику вне диалога
     */
    persistent?: boolean;
    /**
     * Разрешить закрытие по Esc
     */
    canEsc?: boolean;
  }>(),
  {
    closeable: true,
    persistent: false,
    canEsc: true,
  }
);

const emits = defineEmits(["close"]);

const el = ref(null);
const focusTrap = useFocusTrap(el);

function close() {
  emits("close");
}

onMounted(async () => {
  await nextTick();
  focusTrap.activate();

  await nextTick();
});

onBeforeUnmount(() => {
  focusTrap.deactivate();
});
</script>

<template>
  <Teleport to="body">
    <div class="tn-dialog" ref="el" v-bind="$attrs">
      <div class="tn-dialog__overlay"></div>
      <div
        class="tn-dialog__scrollbox"
        @click.self="!persistent && closeable && close()"
        @keydown.esc="canEsc && closeable && close()"
      >
        <div class="tn-dialog__container">
          <header class="tn-dialog__header" v-if="$slots.header">
            <slot name="header"></slot>
          </header>
          <div class="tn-dialog__body" v-if="$slots.default">
            <slot></slot>
          </div>
          <footer class="tn-dialog__footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </footer>
          <TnButton
            class="tn-dialog__close"
            icon="x"
            v-if="props.closeable"
            @click="$emit('close')"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
.tn-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  z-index: 100;
}

.tn-dialog__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(#0a3d8f, 0.18);
}

.tn-dialog__scrollbox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;

  &::before,
  &::after {
    content: "";
    display: block;
    position: relative;
    width: 100%;
    padding-bottom: 48px;
    z-index: 0;
  }
}

.tn-dialog__container {
  position: relative;

  min-width: 240px;
  max-width: 100%;

  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0px 2px 8px 0px rgba(46, 56, 75, 0.15);
}

.tn-dialog__header {
  position: sticky;
  padding: 24px;
}

.tn-dialog__body {
  position: relative;
  padding: 24px;
}

.tn-dialog__footer {
  position: sticky;
  padding: 24px;
}

.tn-dialog__close {
  position: absolute;
  top: 28px;
  right: 24px;

  &.tn-button {
    min-width: 0;
    width: 24px;
    height: 24px;
    padding: 0;
    margin: 0;
  }

  font-size: 24px;
}
</style>
