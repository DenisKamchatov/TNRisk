<script lang="ts" setup>
import { defineComponent, PropType, ref, Ref, watch } from "vue";
import TnIcon from "@/components/uikit/elements/icons/tn-icon.vue";
import TnAvatar from "@/components/uikit/elements/avatar/tn-avatar.vue";
import { TNChipsOption } from "./typings";

const props = withDefaults(
  defineProps<{
    options: TNChipsOption[];
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

const emits = defineEmits(["delete"]);
const modelValue = defineModel<TNChipsOption["id"]>("modelValue");

const TNChips: Ref<HTMLElement | null> = ref(null);

function chooseChip(itemId: TNChipsOption["id"]) {
  modelValue.value = itemId;
}

function deleteChip(itemId: TNChipsOption["id"]) {
  emits("delete", itemId);
}
</script>

<template>
  <ul
    v-if="options && options.length"
    ref="TNChips"
    class="tn-chips"
    :class="{
      'tn-chips_disabled': disabled,
    }"
  >
    <li
      v-for="(item, key) in options"
      :key="key"
      class="tn-chips__item"
      :class="'tn-chips__item-' + item.id"
    >
      <button
        class="tn-chips__item-btn"
        :class="{
          'tn-chips__item-btn_disabled': item.disabled,
          'tn-chips__item-btn_active':
            modelValue && !item.disabled && !disabled && item.id === modelValue,
          'tn-chips__item-btn_icon': !!item.avatar,
        }"
        :disabled="disabled || item.disabled"
        @click="chooseChip(item.id)"
      >
        <TnAvatar
          v-if="item.avatar"
          :text="item.avatar.text"
          :image="item.avatar.image"
          :icon="item.avatar.icon"
          :alt="item.avatar.alt"
          size="sm"
        />

        <span v-if="item.name" class="tn-chips__item-btn-text">
          {{ item.name }}
        </span>

        <span class="tn-chips__delete-icon" @click="deleteChip(item.id)">
          <TnIcon name="x" :size="16" />
        </span>
      </button>
    </li>
  </ul>
</template>

<style lang="scss">
.tn-chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  margin: 0;
  max-height: 92px;

  border-radius: 12px;
  overflow-x: auto;
}

.tn-chips::-webkit-scrollbar {
  display: none;
}

.tn-chips {
  -ms-overflow-style: none;
  scrollbar-width: none;
  max-width: 100%;
}

.tn-chips,
.tn-chips * {
  box-sizing: border-box;
}

.tn-chips__item {
  display: inline-block;
  flex: 0 0 auto;
  vertical-align: middle;
}

.tn-chips__item-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  padding: 10px 16px;

  height: 40px;

  font-size: 14px;
  line-height: 20px;
  font-weight: 400;

  color: var(--chips-color);
  background-color: var(--chips-bg);

  border: none;
  border-radius: 24px;
  cursor: pointer;
  outline: none;
  user-select: none;

  transition: all 0.2s ease;
}

.tn-chips__item-btn_icon {
  padding: 8px 16px 8px 10px;
}

.tn-chips__item-btn:hover {
  background-color: var(--chips-bg-hover);
}

.tn-chips__item-btn:active {
  background-color: var(--chips-bg-active);
}

.tn-chips__item-btn_active {
  background-color: var(--chips-active-bg);
  color: var(--chips-active-color);
}

.tn-chips__item-btn_active:hover {
  background-color: var(--chips-active-bg-hover);
}

.tn-chips__item-btn_active:active {
  background-color: var(--chips-active-bg-active);
}

.tn-chips_disabled {
  pointer-events: none;
}

.tn-chips_disabled .tn-chips__item-btn {
  color: var(--chips-disabled-color);
}

.tn-chips__delete-icon {
  font-size: 16px;

  color: var(--chips-icon-color);
}

.tn-chips__item-btn_active .tn-chips__delete-icon {
  color: var(--chips-active-icon-color);
}

.tn-chips__item-btn-text {
  display: inline-block;
  vertical-align: middle;

  white-space: nowrap;
}

.tn-chips__item-btn_disabled {
  background-color: var(--chips-disabled-bg);
  pointer-events: none;
}
.tn-chips__item-btn_disabled .tn-user-picture {
  opacity: 60%;
}
.tn-chips__item-btn_disabled .tn-chips__item-btn-text {
  color: var(--chips-disabled-text-color);
}
.tn-chips__item-btn_disabled .tn-chips__delete-icon {
  color: var(--chips-disabled-icon-color);
}
</style>
