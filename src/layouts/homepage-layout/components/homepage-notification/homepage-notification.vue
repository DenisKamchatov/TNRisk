<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useRouter } from "vue-router";

import TNIcon from "@/components/uikit/icons/tn-icon.vue";

const props = withDefaults(
  defineProps<{
    block?: boolean;
    href?: string;
    norouter?: boolean;
    target?: string;
    light?: boolean;
    hasNotification?: boolean
  }>(),
  {
    light: true,
  }
);
const router = useRouter();
const slots = useSlots();
const emit = defineEmits(["click"]);

const hasContent = computed<boolean>(() => !!slots["default"]);

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
    class="homepage-notification"
    :class="{
      'homepage-notification_block': block,
      'homepage-notification_light': light,
      'homepage-notification_has-notification': hasNotification
    }"
    @click="onClickButton"
  >
    <span
      class="homepage-notification__icon"
    >
      <TNIcon :size="20" :name="hasNotification ? 'bell-ringing' : 'bell'" />
    </span>

    <div class="homepage-notification__notify" v-if="hasNotification"></div>
  </button>
</template>

<style lang="scss">
.homepage-notification {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;

  height: 48px;
  width: 48px;
  padding: 12px 16px;

  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  border: 1px solid transparent;
  outline: 2px solid transparent;
  background: #F5F6FA;
  color: #2E384B;
  user-select: none;

  transition: 300ms;

  &:hover:enabled {
    border: 1px solid #dfe2e7;

    transition: 300ms;
  }

  &:focus:enabled {
    border: 1px solid #eb3b41;
    outline: 2px solid #fcddde;
    transition: 300ms;
  }

  .homepage-notification__notify {
    position: absolute;
    top: 8px;
    right: 10px;
    width: 4px;
    height: 4px;

    border-radius: 50%;

    background-color: #EB3B41;
  }
}

.homepage-notification_light {
  background: #ffffff;
}

.homepage-notification_logo {
  .homepage-notification__icon-logo {
    font-size: 24px;

    color: #ED1C24;
  }

  .homepage-notification__text-logo {
    font-size: 19px;
    font-weight: 700;
    line-height: 24px;

    color: #242424;
  }

  &:hover:enabled {
    border: 1px solid transparent;
  }

  &:focus:enabled {
    border: 1px solid transparent;
    outline: 2px solid transparent;
  }
}

.homepage-notification__icon {
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  font-size: 24px;

  color: #2E384B;

  svg {
    pointer-events: none;
  }
}
</style>
