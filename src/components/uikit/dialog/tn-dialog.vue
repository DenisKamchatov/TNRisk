<script setup lang="ts">
import {
  computed,
  onMounted,
  onBeforeUnmount,
  provide,
  ref,
  nextTick,
} from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { useElementBounding } from "@vueuse/core";
import TnDialogHeader from "./tn-dialog-header.vue";
import TnButton from "@/components/uikit/button/tn-button.vue";

export type TnDialogPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

const props = withDefaults(
  defineProps<{
    title?: string;
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

    /**
     * Позиция окна
     */
    position?: TnDialogPosition;

    /**
     * Окно может быть длиннее высоты экрана
     */
    overflow?: boolean;
  }>(),
  {
    title: "",
    closeable: true,
    persistent: false,
    canEsc: true,
    position: "center",
    overflow: false,
  }
);

const emits = defineEmits(["close"]);

const el = ref<HTMLElement | null>(null);
const focusTrap = useFocusTrap(el);

const positionClass = computed(() => {
  return `tn-dialog_position-${props.position}`;
});

function close() {
  emits("close");
}

provide("close", close);
provide("closeable", props.closeable);

const headerEl = ref(null);
const headerBounding = useElementBounding(headerEl);
const isHeaderStuck = computed(() => {
  return headerBounding.top.value < 1;
});

const footerEl = ref(null);
const footerBounding = useElementBounding(footerEl);
const isFooterStuck = computed(() => {
  return footerBounding.bottom.value > window.innerHeight - 1;
});

const showFakeButton = ref(false);

onMounted(async () => {
  await nextTick();

  // BUG: focusTrap ломается, если некуда ставить фокус
  // HACK:
  // Ищем фокусируемые элементы и если не находим,
  // то показываем кнопку для focusTrap
  const focusable = el.value?.querySelector(
    "button,textarea,input,a,select,area"
  ) as HTMLElement;
  showFakeButton.value = !focusable;

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
    <Transition>
      <div class="tn-dialog" ref="el" v-bind="$attrs">
        <div class="tn-dialog__overlay"></div>
        <div
          class="tn-dialog__scrollbox"
          :class="[positionClass]"
          @click.self="!persistent && closeable && close()"
          @keydown.esc="canEsc && closeable && close()"
        >
          <div
            class="tn-dialog__container"
            :class="{
              'tn-dialog__container_overflow': overflow,
            }"
          >
            <button
              class="tn-dialog__fake-button"
              v-if="showFakeButton"
            ></button>
            <header
              class="tn-dialog__header"
              :class="{ 'tn-dialog__header_stuck': isHeaderStuck }"
              v-if="$slots.header || title"
              ref="headerEl"
            >
              <slot name="header" :title="title">
                <TnDialogHeader :title="title">

                  <!-- TODO: Один из вариантов избавления от provide/inject для кнопки закрытия -->
                  <!-- <template #close-button v-if="closeable"></template> -->
                </TnDialogHeader>
              </slot>
            </header>
            <div class="tn-dialog__body" v-if="$slots['default']">
              <slot></slot>
            </div>
            <footer
              class="tn-dialog__footer"
              v-if="$slots.footer"
              ref="footerEl"
              :class="{ 'tn-dialog__footer_stuck': isFooterStuck }"
            >
              <slot name="footer"></slot>
            </footer>

          </div>
        </div>
      </div>
    </Transition>
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
  animation: fade-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;

  overflow: hidden;

  min-width: 336px;
  max-width: 100%;

  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0px 2px 8px 0px rgba(46, 56, 75, 0.15);
  animation: dialog-reveal 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.tn-dialog__container_overflow {
  overflow: visible;
}

.tn-dialog__header {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  border-radius: 24px 24px 0 0;
}

.tn-dialog__header_stuck {
  box-shadow: 0px 2px 8px 0px rgba(46, 56, 75, 0.15);
}

.tn-dialog__body {
  position: relative;
  overflow-y: auto;
  flex: 1;
}

.tn-dialog__footer {
  position: sticky;
  bottom: 0;
  padding: 24px;
  border-radius: 0 0 16px 16px;
  background-color: #fff;
  z-index: 1;
}

.tn-dialog__footer_stuck {
  box-shadow: 0px -2px 8px 0px rgba(46, 56, 75, 0.15);
}

.tn-dialog_position-center {
  align-items: center;
  justify-content: space-between;
}

.tn-dialog_position-bottom {
  align-items: center;
  justify-content: flex-end;
  .tn-dialog__container {
    animation-name: dialog-reveal-bottom;
  }
}

.tn-dialog_position-top {
  align-items: center;
  justify-content: flex-start;
}

.tn-dialog_position-right {
  align-items: flex-end;
  justify-content: space-between;
  .tn-dialog__container {
    animation-name: dialog-reveal-right;
  }
}

.tn-dialog_position-top-right {
  align-items: flex-end;
  justify-content: flex-start;
  .tn-dialog__container {
    animation-name: dialog-reveal-right;
  }
}

.tn-dialog_position-bottom-right {
  align-items: flex-end;
  justify-content: flex-end;
  .tn-dialog__container {
    animation-name: dialog-reveal-right;
  }
}

.tn-dialog_position-left {
  align-items: flex-start;
  justify-content: space-between;
  .tn-dialog__container {
    animation-name: dialog-reveal-left;
  }
}

.tn-dialog_position-top-left {
  align-items: flex-start;
  justify-content: flex-start;
  .tn-dialog__container {
    animation-name: dialog-reveal-left;
  }
}

.tn-dialog_position-bottom-left {
  align-items: flex-start;
  justify-content: flex-end;
  .tn-dialog__container {
    animation-name: dialog-reveal-left;
  }
}

.tn-dialog__fake-button {
  width: 0;
  height: 0;
  opacity: 0;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dialog-reveal {
  0% {
    transform: translateY(-16px);
    box-shadow: 0 0 0 0 rgba(46, 56, 75, 0);
  }
  100% {
    transform: translateY(0);
    box-shadow: 0 0 16px 0px rgba(46, 56, 75, 0.15);
  }
}

@keyframes dialog-reveal-bottom {
  0% {
    transform: translateY(16px);
    box-shadow: 0 0 0 0 rgba(46, 56, 75, 0);
  }
  100% {
    transform: translateY(0);
    box-shadow: 0 0 16px 0px rgba(46, 56, 75, 0.15);
  }
}

@keyframes dialog-reveal-right {
  0% {
    transform: translateX(16px);
    box-shadow: 0 0 0 0 rgba(46, 56, 75, 0);
  }
  100% {
    transform: translateX(0);
    box-shadow: 0 0 16px 0px rgba(46, 56, 75, 0.15);
  }
}

@keyframes dialog-reveal-left {
  0% {
    transform: translateX(-16px);
    box-shadow: 0 0 0 0 rgba(46, 56, 75, 0);
  }
  100% {
    transform: translateX(0);
    box-shadow: 0 0 16px 0px rgba(46, 56, 75, 0.15);
  }
}
</style>
