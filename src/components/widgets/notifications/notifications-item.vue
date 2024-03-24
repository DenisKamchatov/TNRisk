<script setup lang="ts">
import TnButton from "@/components/uikit/elements/button/tn-button.vue";
import { onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    title: string;
    text: string;
    href?: string;
    unread?: boolean;
  }>(),
  {
    href: "",
    unread: false
  }
);

const emit = defineEmits(["read", "remove"]);

function onClickClose() {
  emit("read");
  emit("remove");
}

function onClickCard() {
  emit("read");
  if (props.href) {
    window.open(props.href, "_blank");
  }
}
</script>

<template>
  <div
    class="notifications-item"
    :class="{
      'notifications-item_clickable': !!href
    }"
    @click="onClickCard"
  >
    <div class="notifications-item__headline" v-auto-animate>
      <div class="notifications-item__point" v-if="unread"></div>
      <div class="notifications-item__title">{{ title }}</div>
    </div>
    <div class="notifications-item__text">{{ text }}</div>

    <TnButton
      class="notifications-item__close"
      icon="x"
      is-icon
      secondary
      @click.stop="onClickClose"
    />
  </div>
</template>

<style lang="scss">
.notifications-item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 20px;

  border-radius: 12px;
  background: var(--notifications-widget-item-bg);

  cursor: default;
}

.notifications-item__headline {
  display: flex;
  align-items: center;
  gap: 12px;
}

.notifications-item__point {
  display: block;
  width: 8px;
  height: 8px;

  border-radius: 50%;
  background-color: var(--notifications-widget-item-point-bg);
}

.notifications-item__title {
  flex: 1;

  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  color: var(--notifications-widget-item-title-color);
}

.notifications-item__text {
  color: var(--notifications-widget-item-text-color);
  font-kerning: none;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: 'case' on;

  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.notifications-item__close {
  position: absolute;
  top: 20px;
  right: 20px;

  color: var(--notifications-widget-item-close-icon);
  font-size: 24px;

  &.tn-button_large.tn-button_is-icon {
    width: 24px;
    height: 24px;
  }
}

.notifications-item_clickable {
  cursor: pointer;

  &:hover {
    outline: var(--notifications-widget-item-outline-hover);
  }
}
</style>
