<script setup lang="ts">
import { inject } from "vue";
import TnConfirmImage from "./tn-confirm-image.vue";
import TnButton from "../button/tn-button.vue";

const props = withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
  }>(),
  {
    subtitle: "",
  }
);

const close = inject("close", () => {});
const closeable = inject("closeable");

</script>

<template>
  <div class="tn-confirm-header">
    <div class="tn-confirm-header__image">
      <slot name="image">
        <TnConfirmImage />
      </slot>
    </div>

    <h4 class="tn-confirm-header__title">{{ title }}</h4>

    <p class="tn-confirm-header__subtitle">{{ subtitle }}</p>

    <TnButton
      class="tn-confirm-header__close"
      icon="x"
      is-icon
      secondary
      v-if="closeable"
      @click="close"
    />
    </div>
</template>

<style lang="scss">
.tn-confirm-header {
  position: relative;
  display: flex;
  flex-direction: column;
}

.tn-confirm-header__image {
  max-height: 84px;
  margin: 0 auto;
}

.tn-confirm-header__title {
  margin: 16px 0 0 0;

  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;

  color: #2E384B;
}

.tn-confirm-header__subtitle {
  margin: 8px 0 0 0;

  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;

  color: #747C8C;
}

.tn-confirm-header__close {
  position: absolute;
  top: 0;
  right: 0;
}

</style>
