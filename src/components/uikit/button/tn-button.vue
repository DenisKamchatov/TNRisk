<script setup lang="ts">
import {
  PropType,
  defineProps,
  computed,
  useSlots,
  defineEmits,
  getCurrentInstance,
} from "vue";

import { useRouter } from "vue-router";

import TNIcon from "@/components/uikit/icons/tn-icon.vue";
// import TnLoader from "@/components/uikit/elements/loader/tn-loader.vue";

const props = defineProps({
  size: {
    type: String as PropType<"md" | "lg">,
    default: "lg",
  },
  primary: { type: Boolean, default: false },
  secondary: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  icon: { type: String, required: false },
  iconRight: { type: String, required: false },
  href: { required: false, type: String },
  norouter: { type: Boolean },
  target: { required: false, type: String },
  width: { type: [Number, String], required: false },
});

// TODO: можно ли как-то проверять передан слот или нет

const router = useRouter();

const sizeOutput = computed<string | boolean>(() => {
  if (props.size) {
    return props.size;
  }
  return false;
});

const emit = defineEmits(["click"]);
const slots = useSlots();

const hasContent = computed<boolean>(() => !!slots["default"]);
const hasIconSlot = computed<boolean>(() => !!slots["icon"]);
const hasRightIconSlot = computed<boolean>(() => !!slots["icon-right"]);
const hasIcon = computed<boolean>(() => hasIconSlot.value || !!props.icon);
const isOnlyIcon = computed<boolean>(() => !hasContent.value && hasIcon.value);
const hasLeftIcon = computed<boolean>(() => hasIcon.value);
const hasRightIcon = computed<boolean>(
  () => hasRightIconSlot.value || !!props.iconRight
);
// const iconSize = computed<number>(() => {
//   if (props.size === "md") {
//     return 20;
//   }
//   if (props.size === "lg") {
//     return 20;
//   }
//   return 20;
// });

const buttonWidth = computed(() => {
  if (props.width && props.width.toString().includes("%")) {
    return props.width;
  }

  if (props.width && props.width.toString().includes("px")) {
    return props.width;
  }

  return props.width + "%";
});

function onClickButton(e: Event) {
  if (props.href) {
    if (props.norouter || props.target === "_blank") {
      if (props.target === "_blank") {
        window.open(props.href, "_blank");
      } else {
        window.location.href = props.href;
      }
    } else {
      router?.push(props.href);
    }
  }

  emit("click", e);
}
</script>

<template>
  <button
    class="tn-button"
    :disabled="disabled"
    :class="{
      'tn-button_medium': sizeOutput === 'md',
      'tn-button_large': sizeOutput === 'lg',
      'tn-button_lefticon': hasLeftIcon,
      'tn-button_righticon': hasRightIcon,
      'tn-button_disabled': disabled,
      'tn-button_primary': primary,
      'tn-button_secondary': secondary,
      'tn-button_only-icon': isOnlyIcon,
    }"
    :style="{ width: buttonWidth }"
    @click="onClickButton"
  >
    <span
      v-if="hasIcon"
      class="tn-button__icon"
      :class="{
        'tn-button__icon_left': !isOnlyIcon,
      }"
    >
      <slot name="icon">
        <TNIcon :size="20" :name="icon" />
      </slot>
    </span>

    <span v-if="hasContent" class="tn-button__text">
      <slot></slot>
    </span>

    <span v-if="hasRightIcon" class="tn-button__icon tn-button__icon_right">
      <slot name="icon-right">
        <TNIcon :size="20" :name="iconRight" />
      </slot>
    </span>
  </button>
</template>

<style lang="scss">
.tn-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;

  height: 48px;
  padding: 14px 24px;

  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;

  border: none;
  background: none;
  user-select: none;

  transition: 300ms;

  &:disabled,
  &[disabled] {
    opacity: 0.5;
    cursor: initial;
  }

  &.tn-button_only-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    min-width: 48px;
    max-width: 48px;
    height: 48px;
  }

  .tn-badge {
    font-weight: 600;
  }
}

.tn-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  font-size: 20px;

  svg {
    pointer-events: none;
  }
}

.tn-button_medium {
  height: 40px;
  padding: 10px 24px;
  gap: 8px;

  border-radius: 8px;

  &.tn-button_only-icon {
    min-width: 40px;
    max-width: 40px;
    height: 40px;
  }
}

.tn-button_primary {
  color: #ffffff;
  background-color: #eb3b41;

  .tn-button__icon {
    color: #ffffff;
  }

  &:hover:enabled {
    background: #d91921;

    transition: 300ms;
  }

  &:active:enabled {
    background: #c02b31;

    transition: 300ms;
  }

  &:focus {
    animation: focus-animation-primary 500ms ease forwards;
    transition: 300ms;
  }

  .tn-badge {
    background-color: #fcddde;
    color: #eb3b41;
  }
}

.tn-button_secondary {
  color: #2e384b;
  background-color: #e7e9ef;

  .tn-button__icon {
    color: #2e384b;
  }

  &:hover:enabled {
    background: #dfe2e7;

    transition: 300ms;
  }

  &:active:enabled {
    background: #d0d4db;

    transition: 300ms;
  }

  &:focus {
    animation: focus-animation-secondary 500ms ease forwards;
    transition: 300ms;
  }

  .tn-badge {
    background-color: #9ea5b5;
    color: #fff;
  }
}

@keyframes focus-animation-secondary {
  from {
    outline: 1px solid #ffffff00;
    outline-offset: 1px;
  }
  to {
    outline: 1px solid #9ea5b5;
    outline-offset: 1px;
  }
}

@keyframes focus-animation-primary {
  from {
    outline: 1px solid #ffffff00;
    outline-offset: 1px;
  }
  to {
    outline: 1px solid #d91921;
    outline-offset: 1px;
  }
}
</style>
