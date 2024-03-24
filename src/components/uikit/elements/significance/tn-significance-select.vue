<script setup lang="ts">
import TnSignificance from "@/components/uikit/elements/significance/tn-significance.vue";
import { ISignificanceStatuses } from './typings'
import { Dropdown } from "floating-vue";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    isButton?: boolean;
    locale?: string,
  }>(),
  {
  }
);

const modelValue = defineModel<ISignificanceStatuses | null>(
  "modelValue"
);

function chooseSignificance(
  status: ISignificanceStatuses | null
) {
  modelValue.value = status;
}
</script>

<template>
  <Dropdown
    class="tn-significance-select"
    theme="notifications"
    :disabled="disabled"
  >
    <button class="tn-significance-select__button">
      <slot></slot>
    </button>
    <template #popper>
      <div class="tn-significance-select__list">
        <TnSignificance
          v-close-popper
          :locale="locale"
          label="Высокий"
          :value="ISignificanceStatuses.red"
          :shownTooltip="false"
          @click="chooseSignificance(ISignificanceStatuses.red)"
        />
        <TnSignificance
          v-close-popper
          :locale="locale"
          label="Срудний"
          :value="ISignificanceStatuses.yellow"
          :shownTooltip="false"
          @click="chooseSignificance(ISignificanceStatuses.yellow)"
        />
        <TnSignificance
          v-close-popper
          :locale="locale"
          label="Низкий"
          :value="ISignificanceStatuses.green"
          :shownTooltip="false"
          @click="chooseSignificance(ISignificanceStatuses.green)"
        />
        <TnSignificance
          v-close-popper
          :locale="locale"
          label="Отсутствует"
          :value="ISignificanceStatuses.empty"
          :shownTooltip="false"
          @click="chooseSignificance(ISignificanceStatuses.empty)"
        />
      </div>
    </template>
  </Dropdown>
</template>

<style lang="scss">
.v-popper--theme-notifications {
  .v-popper__inner {
    padding: 8px 12px;
    overflow-y: hidden;
    border-radius: 12px;

    box-shadow: var(--significance-dropdown-shadow);
  }
}
</style>
