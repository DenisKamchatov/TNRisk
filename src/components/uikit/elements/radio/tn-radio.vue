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
  font-family: "Proxima Nova", sans-serif, system-ui;
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
  color: #eb3b41;
}

.tn-radio__text-warn {
  font-size: 14px;
  line-height: 16px;
  color: #eb3b41;
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
  border: 2px solid #d0d4db;
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
  border: 3px solid #d0d4db;
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
  border-color: #9ea5b5;
  background-color: #f5f6fa;
}

.tn-radio__button:active {
  border-color: #9ea5b5;
  background-color: #f5f6fa;
}

.tn-radio__button_disabled {
  pointer-events: none;
  /* border-color: #D0D4DB; */
  opacity: 72%;
}

.tn-radio__button_checked {
  border-color: #eb3b41;
}

.tn-radio__button_checked:focus {
  border: 3px solid #eb3b41;
  transition: 0.25s;
}

.tn-radio__button_checked:after {
  opacity: 1;
}

.tn-radio__button_checked:active {
  border-color: #d91921;
}

.tn-radio__button_checked:active:after {
  background-color: #d91921;
}

.tn-radio__button_checked:hover {
  border-color: #d91921;
}

.tn-radio__button_checked:after {
  background-color: #eb3b41;
  transform: scale(1);
}

.tn-radio__button_checked:hover:after {
  background-color: #d91921;
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
