<script setup lang="ts">
import { inject } from "vue";
import TnButton from "@/components/uikit/button/tn-button.vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    closeable?: boolean;
    description?: string;
  }>(),
  {
    title: undefined,
    closeable: true,
    description: "",
  }
);

// TODO: подумать нужно ли это здесь
const close = inject("close", () => {});

const emit = defineEmits(["close"]);

function onClickClose() {
  close();
  emit("close");
}
</script>

<template>
  <div
    class="tn-dialog-header"
    :class="{ 'tn-dialog-header_closeable': closeable }"
  >
    <div class="tn-dialog-header__title-block" v-if="title || $slots.title || closeable">
      <h4 class="tn-dialog-header__title">
        <slot name="title">{{ title }}</slot>
      </h4>
      <div class="tn-dialog-header__buttons">
        <slot name="buttons"></slot>

        <TnButton
          class="tn-dialog__close"
          icon="x"
          is-icon
          secondary
          v-if="closeable"
          @click="onClickClose"
          v-close-popper
        />
      </div>
    </div>

    <p class="tn-dialog-header__description" v-if="description || $slots.description">
      <slot name="description">{{ description }}</slot>
    </p>

    <slot></slot>
  </div>
</template>

<style lang="scss">
.tn-dialog-header {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 28px 24px;

  border-bottom: 1px solid #E7E9EF;
}

.tn-dialog-header__title-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  gap: 16px;
}

.tn-dialog-header__title {
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;

  color: #2E384B;
}



.tn-dialog-header__buttons button {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
  gap: 16px;

  color: #9EA5B5;
}

.tn-dialog-header__description {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  color: #747C8C;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// .tn-dialog-header_closeable {
//   .tn-dialog-header__buttons {
//     right: 32px;
//   }
// }

</style>
