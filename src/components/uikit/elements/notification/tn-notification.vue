<script setup lang="ts">
import TnIcon from "@/components/uikit/elements/icons/tn-icon.vue";
import TnButton from "@/components/uikit/elements/button/tn-button.vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    icon?: string;
  }>(),
  {}
);

const emits = defineEmits(["close"]);

const close = () => {
  emits("close");
};
</script>

<template>
  <div class="tn-notification">
    <div class="tn-notification__icon" v-if="icon || $slots.icon">
      <slot name="icon">
        <TnIcon :name="icon" />
      </slot>
    </div>

    <div class="tn-notification__body">
      <div class="tn-notification__title" v-if="title">
        {{ title }}
      </div>

      <div
        class="tn-notification__description"
        v-if="description || $slots.description"
      >
        <slot name="description">{{ description }}</slot>
      </div>

      <div class="tn-notification__button">
        <slot name="button"></slot>
      </div>
    </div>

    <div class="tn-notification__close" @click="close">
      <TnButton icon="x" is-icon size="lg" />
    </div>
  </div>
</template>

<style lang="scss">
.tn-notification {
  display: flex;
  gap: 16px;
  padding: 24px;
  max-width: 450px;

  box-shadow: var(--notification-shadow);

  border-radius: 24px;
}

.tn-notification__icon {
  font-size: 24px;

  color: var(--notification-icon);
}

.tn-notification__body {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .tn-notification__title {
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;

    color: var(--notification-title);
  }

  .tn-notification__description {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;

    color: var(--notification-description);
  }

  .tn-notification__button {
    margin: 8px 0 0 0;
  }
}

.tn-notification__close {
  color: var(--notification-close);
}
</style>
