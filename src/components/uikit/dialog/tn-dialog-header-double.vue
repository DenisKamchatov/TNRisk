<script setup lang="ts">
import { inject } from "vue";
import TnButton from "@/components/uikit/button/tn-button.vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    secondTitle?: string,
    closeable?: boolean;
  }>(),
  {
    title: undefined,
    closeable: true,
  }
);

const close = inject("close", () => {});
const closeable = inject("closeable");
</script>

<template>
  <div
    class="tn-dialog-header-double"
    :class="{ 'tn-dialog-header-double_closeable': closeable }"
  >
    <div class="tn-dialog-header-double__col-1">
      <h4>
        <slot name="title">{{ title }}</slot>
      </h4>

      <div class="tn-dialog-header-double__buttons">
        <slot name="buttons"></slot>
      </div>
    </div>

    <div class="tn-dialog-header-double__col-2">
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

  </div>
</template>

<style lang="scss">
.tn-dialog-header-double {
  display: grid;
  grid-template-columns: 1fr 1fr;

  border-bottom: 1px solid #E7E9EF;
}

.tn-dialog-header-double__col-1 {
  border-right: 1px solid #E7E9EF;
}

.tn-dialog-header-double__col-1, .tn-dialog-header-double__col-2 {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 28px 24px;

  h4 {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;

    color: #2E384B;
  }

  .tn-dialog-header-double__buttons {
    display: flex;
    align-items: center;
    gap: 16px;

    button {
      color: #9EA5B5;
    }
  }
}
</style>
