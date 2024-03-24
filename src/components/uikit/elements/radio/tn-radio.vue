<script lang="ts" setup>
import { computed, defineComponent, PropType, useSlots } from "vue";
import { TNRadioButtonOption } from "./typings";

const props = defineProps({
  itemValue: {
    required: true,
    type: Object as PropType<TNRadioButtonOption>,
  },
  summaryValue: {
    required: true,
    type: null as unknown as PropType<TNRadioButtonOption | null>,
    validator: (v: any) =>
      v === null || (typeof v === "object" && (v.id || v.id === 0)),
  },
  uniqueKey: { required: false, type: String },
  disabled: { required: false, type: Boolean },
  readonly: { required: false, type: Boolean },
  error: { required: false, type: String },
  warn: { required: false, type: String },
});

const emits = defineEmits(["input"]);
const slots = useSlots();

const inputId = computed<string>(
  () => "tn-radiobutton-" + Math.floor(Math.random() * 9999) + 1
);

const isChecked = computed<boolean>(
  () => props.itemValue?.id === props.summaryValue?.id
);

const hasLabelSlot = computed<boolean>(() => !!slots.label);

function handleMouseUp(event: MouseEvent) {
  (event.target as HTMLButtonElement).blur();
}

function onChecked() {
  emits("input", props.itemValue);
}
</script>

<template>
  <label
    class="tn-radio"
    :class="{
      'tn-radio_has-label': !!itemValue?.label,
      'tn-radio_disabled': disabled,
      'tn-radio_readonly': readonly,
    }"
  >
    <div class="tn-radio__checkbox">
      <button
        :id="inputId"
        class="tn-radio__button"
        type="button"
        :class="{
          'tn-radio__button_disabled': disabled,
          'tn-radio__button_checked': isChecked,
        }"
        :disabled="disabled"
        @click="onChecked"
        @mouseup="handleMouseUp"
      ></button>
    </div>

    <div v-if="itemValue?.label || hasLabelSlot" class="tn-radio__text">
      <label v-if="hasLabelSlot" class="tn-radio__text-inner" :for="inputId">
        <slot name="label"></slot>
      </label>
      <label v-else class="tn-radio__text-inner" :for="inputId">{{
        itemValue?.label
      }}</label>

      <p v-if="error" class="tn-radio__text-error">
        {{ error }}
      </p>
      <p v-if="warn" class="tn-radio__text-warn">
        {{ warn }}
      </p>
    </div>
  </label>
</template>

<style lang="css">
.tn-radio {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  flex-wrap: nowrap;
}

.tn-radio_has-label {
  display: flex;
  width: 100%;
}

.tn-radio__text {
  align-self: center;
  padding-left: 10px;
  font-size: 16px;
  line-height: 22px;
}

.tn-radio__text-error {
  font-size: 14px;
  line-height: 16px;
  color: var(--radio-error-text);
}

.tn-radio__text-warn {
  font-size: 14px;
  line-height: 16px;
  color: var(--radio-warn-text);
}

.tn-radio_disabled {
  pointer-events: none;
}

.tn-radio_readonly {
  pointer-events: none;
}

.tn-radio_disabled .tn-radio__text {
  opacity: 0.6;
}

.tn-radio__button {
  appearance: none;
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  border: var(--radio-border);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  margin: 0;
  transition: 0.25s;
  position: relative;
  background-color: transparent;
  box-shadow: none;
  padding: 0;
}

.tn-radio__button:focus {
  border: var(--radio-border-focus);
  transition: 0.25s;
}

.tn-radio__button:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transform: scale(0.25);
  opacity: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: transparent;
  transition: 0.25s;
}

.tn-radio__button:hover {
  border-color: var(--radio-border-color-hover);
  background-color: var(--radio-bg-hover);
}

.tn-radio__button:active {
  border-color: var(--radio-border-color-active);
  background-color: var(--radio-bg-active);
}

.tn-radio__button_disabled {
  pointer-events: none;
  /* border-color: #D0D4DB; */
  opacity: 72%;
}

.tn-radio__button_checked {
  border-color: var(--radio-checked-border-color);
}

.tn-radio__button_checked:focus {
  border: var(--radio-checked-border-focus);
  transition: 0.25s;
}

.tn-radio__button_checked:after {
  opacity: 1;
}

.tn-radio__button_checked:active {
  border-color: var(--radio-checked-border-color-active);
}

.tn-radio__button_checked:active:after {
  background-color: var(--radio-checked-bg-active-after);
}

.tn-radio__button_checked:hover {
  border-color: var(--radio-checked-border-color-hover);
}

.tn-radio__button_checked:after {
  background-color: var(--radio-checked-bg-after);
  transform: scale(1);
}

.tn-radio__button_checked:hover:after {
  background-color: var(--radio-checked-bg-hover-after);
}

.tn-radio__button_disabled.tn-radio__button_checked {
  opacity: 48%;
}

.tn-radio__button_disabled.tn-radio__button_checked:after {
  opacity: 48%;
}

.tn-radio__text-inner {
  cursor: pointer;
}
</style>
