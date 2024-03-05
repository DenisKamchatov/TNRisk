<script setup lang="ts">
import { onMounted } from "vue";
import TnIcon from "../icons/tn-icon.vue";
import TnAvatar from "../avatar/tn-avatar.vue";

const props = withDefaults(
  defineProps<{
    tooltip?: string;
    to?: string;
    icon?: string;
    disabled?: boolean;
    nested?: boolean;
  }>(),
  {
    disabled: false,
    nested: false,
  }
);

const emit = defineEmits(["click"]);

function onClickButton() {
  emit("click");
};
</script>

<template>
  <button
    class="tn-dropdown-menu-item"
    @click="onClickButton"
    :disabled="disabled"
  >
    <slot name="icon">
      <TnIcon
        v-if="icon"
        class="tn-dropdown-menu-item__icon"
        :name="icon"
      />
    </slot>
    <span class="tn-dropdown-menu-item__text"><slot>menuitem</slot></span>
    <slot name="icon-right">
      <TnIcon v-if="nested" class="tn-dropdown-menu-item__icon" name="chevron-right" />
    </slot>
  </button>
</template>

<style lang="scss">
.tn-dropdown-menu-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;

  padding: 14px 12px;

  border-radius: 12px;
  background-color: #fff;

  &:hover {
    background-color: #F5F6FA;
  }

  &:focus {
    background-color: #F5F6FA;
  }
}

.tn-dropdown-menu-item__text {
  flex: 1;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-align: left;

  color: var(--Text-Body, #2E384B);
}
</style>
