<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useRouter } from "vue-router";

import TNIcon from "@/components/uikit/elements/icons/tn-icon.vue";

const props = withDefaults(
  defineProps<{
    block?: boolean;
    icon?: string;
    iconRight?: string;
    href?: string;
    norouter?: boolean;
    target?: string;
    width?: number | string;
    logo?: boolean;
    light?: boolean;
  }>(),
  {
    light: true
  }
);
const router = useRouter();
const slots = useSlots();
const emit = defineEmits(["click"]);

const hasIconSlot = computed<boolean>(() => !!slots["icon"]);
const hasRightIconSlot = computed<boolean>(() => !!slots["icon-right"]);
const hasContent = computed<boolean>(() => !!slots["default"]);
const hasIcon = computed<boolean>(() => hasIconSlot.value || !!props.icon);
const isOnlyIcon = computed<boolean>(() => !hasContent.value && hasIcon.value);
const hasRightIcon = computed<boolean>(
  () => hasRightIconSlot.value || !!props.iconRight
);

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
    class="homepage-button"
    :class="{
      'homepage-button_block': block,
      'homepage-button_only-icon': isOnlyIcon,
      'homepage-button_logo': logo,
      'homepage-button_light': light
    }"
    :style="{ width: buttonWidth }"
    @click="onClickButton"
  >
    <span
      v-if="hasIcon || logo"
      class="homepage-button__icon"
      :class="{
        'homepage-button__icon-logo': logo
      }"
    >
      <slot name="icon">
        <TNIcon :size="20" :name="icon || 'logotype'" />
      </slot>
    </span>

    <span
      v-if="hasContent || logo"
      class="homepage-button__body"
      :class="{
        'homepage-button__text-logo': logo
      }"
    >
      <slot>{{ logo && 'Risk' }}</slot>
    </span>

    <span
      v-if="hasRightIcon"
      class="homepage-button__icon"
    >
      <slot name="icon-right">
        <TNIcon :size="20" :name="iconRight" />
      </slot>
    </span>
  </button>
</template>

<style lang="scss">
.homepage-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;

  height: 48px;
  padding: 12px 16px;

  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  border: 1px solid transparent;
  outline: 2px solid transparent;
  background: var(--header-button-bg);
  color: var(--header-button-color);
  user-select: none;

  transition: 300ms;

  &.homepage-button_only-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    min-width: 48px;
    max-width: 48px;
    height: 48px;
  }

  &:hover:enabled {
    border: var(--header-button-border-hover);

    transition: 300ms;
  }

  &:focus:enabled {
    border: var(--header-button-border-focus);
    outline: var(--header-button-outline-focus);
    transition: 300ms;
  }
}

.homepage-button_light {
  background: var(--header-button-light-bg);
}

.homepage-button_logo {
  .homepage-button__icon-logo {
    font-size: 24px;

    color: var(--header-button-logo-icon);
  }

  .homepage-button__text-logo {
    font-size: 19px;
    font-weight: 700;
    line-height: 24px;

    color: var(--header-button-logo-text);
  }

  &:hover:enabled {
    border: 1px solid transparent;
  }

  &:focus:enabled {
    border: 1px solid transparent;
    outline: 2px solid transparent;
  }
}

.homepage-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  font-size: 24px;

  color: var(--header-button-icon);

  svg {
    pointer-events: none;
  }
}

.homepage-button_block {
  display: flex;
  width: 100%;
}
</style>
