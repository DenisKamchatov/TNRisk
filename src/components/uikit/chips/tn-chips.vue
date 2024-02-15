<script lang="ts" setup>
import { defineComponent, PropType, ref, Ref, watch } from "vue";
import TnIcon from "@/components/uikit/icons/tn-icon.vue";
import TnAvatar from "@/components/uikit/avatar/tn-avatar.vue";
import { TNChipsOption } from "./typings.ts";

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

<style lang="css">
.tn-chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  /* display: grid;
  grid-template-columns:repeat( auto-fit, minmax( 120px, 1fr) );;
  grid-template-rows: 40px 40px;
  grid-gap: 12px; */

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

  color: #2e384b;
  background-color: #e8e9ed;

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
  background-color: #d5d6da;
}

.tn-chips__item-btn:active {
  background-color: #c4c5ca;
}

.tn-chips__item-btn_active {
  background-color: #2e384b;
  color: #ffffff;
}

.tn-chips__item-btn_active:hover {
  background-color: #2a3344;
}

.tn-chips__item-btn_active:active {
  background-color: #252d3d;
}

.tn-chips_disabled {
  pointer-events: none;
}

.tn-chips_disabled .tn-chips__item-btn {
  color: #bcc1ce;
}

.tn-chips__delete-icon {
  font-size: 16px;

  color: #747c8c;
}

.tn-chips__item-btn_active .tn-chips__delete-icon {
  color: #ffffff;
}

.tn-chips__item-btn-text {
  display: inline-block;
  vertical-align: middle;

  white-space: nowrap;
}

.tn-chips__item-btn_disabled {
  background-color: #e8e9ed;
  pointer-events: none;
}
.tn-chips__item-btn_disabled .tn-user-picture {
  opacity: 60%;
}
.tn-chips__item-btn_disabled .tn-chips__item-btn-text {
  color: #b0b4be;
}
.tn-chips__item-btn_disabled .tn-chips__delete-icon {
  color: #9b9fa9;
}
</style>
