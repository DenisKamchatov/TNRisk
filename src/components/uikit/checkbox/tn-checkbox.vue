<script lang="ts" setup>
import { computed, ComputedRef, useSlots, toRaw } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    value: {};
    disabled?: boolean;
    error?: string;
    warn?: string;
    description?: string;
    readonly?: boolean;
  }>(),
  {}
);

const modelValue = defineModel<any>();
const slots = useSlots();

const inputId: ComputedRef<string> = computed(
  () => `tn-checkbox-${Math.floor(Math.random() * 9999) + 1}`
);
const hasLabelSlot: ComputedRef<boolean> = computed(() => !!slots.default);

const valueString = computed(() => {
  return JSON.stringify(props.value);
});

/**
 * `true` Если модель это массив
 * и в нём есть это значение
 */
const inModelArray = computed((): boolean => {
  if (!Array.isArray(modelValue.value)) {
    return false;
  }

  return !!modelValue.value.find((el) => {
    if (typeof props.value === "object") {
      return JSON.stringify(el) === valueString.value;
    }
    return toRaw(el) === toRaw(props.value);
  });
});

const isChecked = computed((): boolean => {
  if (props.value === undefined) {
    return !!modelValue.value;
  }

  if (Array.isArray(modelValue.value)) {
    return inModelArray.value;
  }

  return JSON.stringify(modelValue.value) === JSON.stringify(props.value);
});

// function handleMouseUp(event: MouseEvent) {
//   (event.target as HTMLButtonElement).blur();
// }

function clickHandler() {
  modelValue.value = modelValue.value;
}

function onInput() {
  if (props.value === undefined) {
    return (modelValue.value = !modelValue.value);
  }

  if (Array.isArray(modelValue.value)) {
    if (inModelArray.value) {
      return (modelValue.value = modelValue.value.filter(
        (el) => JSON.stringify(el) !== valueString.value
      ));
    }
    return (modelValue.value = [
      ...toRaw(modelValue.value),
      toRaw(props.value),
    ]);
  }
  modelValue.value = isChecked.value ? null : props.value;
}
</script>

<template>
  <label
    class="tn-checkbox"
    :class="{
      'tn-checkbox_has-label': !!label,
      'tn-checkbox_disabled': disabled,
      'tn-checkbox_readonly': readonly,
    }"
  >
    <button
      :id="inputId"
      class="tn-checkbox__btn"
      type="button"
      :class="{
        'tn-checkbox__btn_disabled': disabled,
        'tn-checkbox__btn_checked': isChecked,
      }"
      :disabled="disabled"
      @click="onInput"
    ></button>

    <span v-if="label || hasLabelSlot" class="tn-checkbox__text">
      <label v-if="hasLabelSlot" class="tn-checkbox__text-inner" :for="inputId">
        <slot></slot>
      </label>
      <label v-else class="tn-checkbox__text-inner" :for="inputId">{{
        label
      }}</label>

      <span v-if="description" class="tn-checkbox__description">{{
        description
      }}</span>

      <span v-if="!!error" class="tn-checkbox__text-error">
        {{ error }}
      </span>
      <span v-if="!!warn" class="tn-checkbox__text-warn">
        {{ warn }}
      </span>
    </span>
  </label>
</template>

<style lang="scss">
.tn-checkbox {
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  word-break: break-word;
}

.tn-checkbox__text {
  display: inline-block;
  vertical-align: middle;
  margin-top: 2px;
  padding-left: 10px;
}

.tn-checkbox__description {
  color: #171c25;
  font-size: 16px;
  margin-top: 6px;
  display: block;
}

.tn-checkbox__text-inner {
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
}

.tn-checkbox__text-error {
  margin-top: 7px;
  font-size: 14px;
  line-height: 16px;
  display: block;
  color: "#D91921";
}

.tn-checkbox__text-warn {
  margin-top: 7px;
  font-size: 14px;
  line-height: 16px;
  display: block;
  color: "#D91921";
}

.tn-checkbox__btn {
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  border: 2px solid #d0d4db;
  background-color: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  position: relative;
  transform: translate3d(0, 0, 0);
  transition-property: background-color, border;
  transition-duration: 0.1s;
  transition-timing-function: linear;
}

.tn-checkbox__btn:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  transition: all 0.25s 0s ease;
  box-shadow: none;
}

.tn-checkbox__btn:after {
  content: "";
  position: absolute;
  height: 14px;
  left: 2px;
  top: 2px;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 8.30501L6.15251 12.4575L14.4575 4.1525' stroke='white' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-position: left center;
  background-size: cover;
  width: 0;
  transition: 0.3s;
  overflow: hidden;
}

.tn-checkbox__btn:hover {
  border-color: #9ea5b5;
  background-color: #f5f6fa;
}

.tn-checkbox__btn:active {
  border-color: #9ea5b5;
  background-color: #e9ebf1;
}

.tn-checkbox_readonly {
  pointer-events: none;
}

.tn-checkbox__btn_disabled {
  opacity: 48%;
  pointer-events: none;
}

.tn-checkbox__btn_checked {
  background-color: #eb3b41;
  border-color: #eb3b41;

  &:focus {
    outline: 1px solid #d91921;
    outline-offset: 1px;
  }
}

.tn-checkbox__btn_checked:after {
  width: 14px;
  border-radius: 2px;
}

.tn-checkbox__btn_checked:hover {
  background-color: #d91921;
  border-color: #d91921;
}

.tn-checkbox__btn_checked.tn-checkbox__btn_disabled {
  opacity: 48%;
}

.tn-checkbox__btn_checked:active {
  background-color: #c02b31;
  border-color: #c02b31;
}

.tn-checkbox_disabled {
  pointer-events: none;
}

.tn-checkbox_disabled .tn-checkbox__text {
  opacity: 0.6;
}
</style>
