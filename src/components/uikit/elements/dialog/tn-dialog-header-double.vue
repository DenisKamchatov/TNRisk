<script setup lang="ts">
import { inject } from "vue";
import TnButton from "@/components/uikit/elements/button/tn-button.vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    secondTitle?: string,
    description?: string,
    secondDescription?: string,
    closeable?: boolean;
  }>(),
  {
    title: undefined,
    closeable: true,
    description: "",
    secondDescription: "",
  }
);

const close = inject("close", () => {});
const closeable = inject("closeable");
</script>

<template>
  <div
    class="tn-dialog-header-double"
  >
    <div class="tn-dialog-header-double__col-1">
      <div class="tn-dialog-header-double__title-block" v-if="title || $slots.title">
        <h4>
          <slot name="title">{{ title }}</slot>
        </h4>

        <div class="tn-dialog-header-double__buttons">
          <slot name="buttons"></slot>
        </div>
      </div>

      <p class="tn-dialog-header__description" v-if="description || $slots.description">
        <slot name="description">{{ description }}</slot>
      </p>

      <slot name="body"></slot>

    </div>

    <div class="tn-dialog-header-double__col-2">
      <div class="tn-dialog-header-double__title-block" v-if="secondTitle || $slots.secondTitle || closeable">
        <h4>
          <slot name="secondTitle">{{ secondTitle }}</slot>
        </h4>

        <div class="tn-dialog-header-double__buttons">
          <slot name="buttonsRight"></slot>

          <TnButton
            class="tn-dialog__close"
            icon="x"
            is-icon
            secondary
            v-if="closeable"
            @click="close"
          />
        </div>
      </div>

      <p class="tn-dialog-header__description" v-if="secondDescription || $slots.secondDescription">
        <slot name="secondDescription">{{ secondDescription }}</slot>
      </p>

      <slot name="secondBody"></slot>

    </div>

  </div>
</template>

<style lang="scss">
.tn-dialog-header-double {
  display: grid;
  grid-template-columns: 1fr 1fr;

  border-bottom: var(--dialog-header-border-bottom);
}

.tn-dialog-header-double__title-block {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 16px;

  h4 {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;

    color: var(--dialog-header-title-color);
  }

  .tn-dialog-header-double__buttons {
    display: flex;
    align-items: center;
    gap: 16px;

    button {
      color: var(--dialog-header-button-color);
    }
  }
}

.tn-dialog-header-double__col-1 {
  border-right: var(--dialog-header-border-right);
}

.tn-dialog-header-double__col-1, .tn-dialog-header-double__col-2 {
  display: flex;
  flex-direction: column;

  gap: 8px;

  padding: 28px 24px;
}

.tn-dialog-header__description {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  color: var(--dialog-header-description-color);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
