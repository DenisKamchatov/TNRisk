<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    // TODO: В дизайне нет label, error, warn и description
    label?: string;
    modelValue: boolean;
    disabled?: boolean;
    error?: string;
    warn?: string;
    description?: string;
  }>(),
  {}
);

const emits = defineEmits(["update:modelValue"]);
const slots = useSlots();

const inputId: ComputedRef<string> = computed(
  () => `tn-checkbox-${Math.floor(Math.random() * 9999) + 1}`
);
const hasLabelSlot: ComputedRef<boolean> = computed(() => !!slots.label);

function handleMouseUp(event: MouseEvent) {
  (event.target as HTMLButtonElement).blur();
}

function clickHandler() {
  emits("update:modelValue", !props.modelValue);
}

</script>

<template>
  <label
    class="tn-checkbox"
    :class="{
      'tn-checkbox_has-label': !!label,
      'tn-checkbox_disabled': disabled,
    }"
  >
    <button
      :id="inputId"
      class="tn-checkbox__btn"
      type="button"
      :class="{
        'tn-checkbox__btn_disabled': disabled,
        'tn-checkbox__btn_checked': modelValue,
      }"
      :disabled="disabled"
      @click="clickHandler"
      @mouseup="handleMouseUp"
    ></button>

    <span v-if="label || hasLabelSlot" class="tn-checkbox__text">
      <label v-if="hasLabelSlot" class="tn-checkbox__text-inner" :for="inputId"
        ><slot name="label"></slot
      ></label>
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
  font-family: "Proxima Nova", sans-serif, system-ui;
}

.tn-checkbox_has-label {
  width: 100%;
}

.tn-checkbox__text {
  display: inline-block;
  vertical-align: middle;
  margin-top: 2px;
  padding-left: 10px;
}

.tn-checkbox__description {
  color: var(--content-secondary-enabled);
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
  color: '#D91921';
}

.tn-checkbox__text-warn {
  margin-top: 7px;
  font-size: 14px;
  line-height: 16px;
  display: block;
  color: '#D91921';
}

.tn-checkbox__btn {
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  border: 2px solid #D0D4DB;
  background-color: #FFFFFF;
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
  border-color: #9EA5B5;
  background-color: #F5F6FA;
}

.tn-checkbox__btn:active {
  border-color: #9EA5B5;
  background-color: #E9EBF1;
}

.tn-checkbox__btn_disabled {
  opacity: 48%;
  pointer-events: none;
}

.tn-checkbox__btn_checked {
  background-color: #EB3B41;
  border-color: #EB3B41;


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
  background-color: #D91921;
  border-color: #D91921;
}

.tn-checkbox__btn_checked.tn-checkbox__btn_disabled {
  opacity: 48%;
}

.tn-checkbox__btn_checked:active {
  background-color: #C02B31;
  border-color: #C02B31;
}

.tn-checkbox_disabled {
  pointer-events: none;
}

.tn-checkbox_disabled .tn-checkbox__text {
  opacity: 0.6;
}
</style>
