<script setup lang="ts">
import { inject } from "vue";
import TnButton from "@/components/uikit/button/tn-button.vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    closeable?: boolean;
  }>(),
  {
    title: undefined,
    closeable: true,
  }
);

// TODO: подумать нужно ли это здесь
const close = inject("close", () => {});
const closeable = inject("closeable");

// TODO: подумать как получить closeable в хедере
// const closeable = inject("closeable", () => true);
</script>

<template>
  <div
    class="th-dialog-header"
    :class="{ 'th-dialog-header_closeable': closeable }"
  >
    <h4 class="th-dialog-header__title">
      <slot name="title">{{ title }}</slot>
    </h4>
    <div class="th-dialog-header__buttons">
      <slot name="buttons"></slot>

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
</template>

<style lang="scss">
.th-dialog-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 28px 24px;

  border-bottom: 1px solid #E7E9EF;
}

.th-dialog-header__title {
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;

  color: #2E384B;
}



.th-dialog-header__buttons button {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
  gap: 16px;

  color: #9EA5B5;
}

// .th-dialog-header_closeable {
//   .th-dialog-header__buttons {
//     right: 32px;
//   }
// }

</style>
