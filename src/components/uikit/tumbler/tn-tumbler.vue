<script lang="ts" setup>
import {
  computed,
  ComputedRef,
  useSlots,
} from "vue";
import TNIcon from "@/components/uikit/icons/tn-icon.vue";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    block?: boolean;
    size?: "md" | "lg";
    icon?: string;
    error?: string;
    warn?: string;
    label?: string;
    description?: string;
    leftLabel?: boolean;
  }>(),
  {
    size: "md",
    label: "",
    leftLabel: false,
    block: false,
    disabled: false,
  }
);
const modelValue = defineModel<boolean>("modelValue", {
  type: Boolean,
  required: false,
  default: false,
})
const slots = useSlots();

const hasLabel: ComputedRef<boolean> = computed(
    () => !!props.label || !!slots.label || !!props.warn || !!props.description
  ),
  hasIcon: ComputedRef<boolean> = computed(() => !!props.icon || !!slots.icon);

function onTumblerClick() {
  if (props.disabled) return;
  modelValue.value = !modelValue.value;
}
</script>

<template>
  <div
    class="tn-tumbler"
    :class="{
      'tn-tumbler_block': block,
      'tn-tumbler_disabled': disabled,
    }"
  >
    <div v-if="hasLabel && leftLabel" class="tn-tumbler__text">
      <p class="tn-tumbler__text-inner">
        <slot name="label">{{ label }}</slot>
      </p>
      <p v-if="description" class="tn-tumbler__text-description">
        {{ description }}
      </p>
      <p v-if="error" class="tn-tumbler__text-error">
        {{ error }}
      </p>
      <p v-if="warn" class="tn-tumbler__text-warn">
        {{ warn }}
      </p>
    </div>
    <button
      class="tn-tumbler__btn"
      :class="{
        'tn-tumbler__btn_active': !!modelValue,
        'tn-tumbler__btn_disabled': disabled,
        'tn-tumbler__btn_medium': size === 'md',
        'tn-tumbler__btn_large': size === 'lg',
      }"
      role="switch"
      :aria-checked="!!modelValue"
      :disabled="disabled"
      @click="onTumblerClick"
    >
      <span v-if="hasIcon" class="tn-tumbler__btn-icon">
        <slot name="icon">
          <TNIcon :size="size === 'lg' ? 20 : 16" :name="icon" />
        </slot>
      </span>
    </button>
    <div v-if="hasLabel && !leftLabel" class="tn-tumbler__text">
      <p class="tn-tumbler__text-inner">
        <slot name="label">{{ label }}</slot>
      </p>
      <p v-if="description" class="tn-tumbler__text-description">
        {{ description }}
      </p>
      <p v-if="error" class="tn-tumbler__text-error">
        {{ error }}
      </p>
      <p v-if="warn" class="tn-tumbler__text-warn">
        {{ warn }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.tn-tumbler {
  display: inline-flex;
  vertical-align: middle;
  justify-content: space-between;
  flex-wrap: nowrap;
  max-width: 100%;
}

.tn-tumbler_block {
  display: flex;
}

.tn-tumbler_disabled .tn-tumbler__text {
  opacity: 0.6;
}

.tn-tumbler__text {
  padding-left: 12px;
  padding-right: 12px;
  align-self: center;
}

.tn-tumbler__text-inner {
  font-size: 16px;
  line-height: 24px;
}

.tn-tumbler__text-description {
  line-height: 20px;
  font-weight: 400;
  font-size: 14px;
  color: rgba(46, 56, 75, 1);
}

.tn-tumbler__text-error {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: rgba(235, 59, 65, 1);
}

.tn-tumbler__text-warn {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: rgba(235, 59, 65, 1);
}

.tn-tumbler__btn {
  display: inline-block;
  vertical-align: middle;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.25s;
  position: relative;
  font-size: 16px;
  line-height: 1;
  flex: 0 0 auto;
  --secondary-color: currentColor;
  background-color: rgba(208, 212, 219, 1);
  color: rgba(255, 255, 255, 1);
  overflow: hidden;
}

.tn-tumbler__btn:after {
  content: "";
  position: absolute;
  left: 2px;
  top: 50%;
  background-color: #ffffff;
  border-radius: 50%;
  pointer-events: none;
  transition: 0.3s;
}

.tn-tumbler__btn:hover {
  background-color: #b6bcc8;
}

.tn-tumbler__btn:active {
  background-color: #9ea5b5;
}

.tn-tumbler__btn:focus {
  animation: focus-animation 500ms ease forwards;
  transition: 300ms;
}

.tn-tumbler__btn_disabled {
  pointer-events: none;
  opacity: 48%;
}

.tn-tumbler__btn_medium {
  width: 48px;
  height: 24px;
  border-radius: 40px;
}

.tn-tumbler__btn_medium:after {
  width: 21px;
  height: 21px;
  margin-top: -10.5px;
}

.tn-tumbler__btn_large {
  width: 64px;
  height: 32px;
  border-radius: 40px;
}

.tn-tumbler__btn_large:after {
  width: 28px;
  height: 28px;
  margin-top: -14px;
}

.tn-tumbler__btn_active {
  background-color: #eb3b41;
}

.tn-tumbler__btn_active:hover {
  background-color: #d91921;
}

.tn-tumbler__btn_active:focus {
  animation: focus-animation-active 500ms ease forwards;
  transition: 300ms;
}

.tn-tumbler__btn_large {
  font-size: 20px;
}

.tn-tumbler__btn_medium.tn-tumbler__btn_active:after {
  left: 24.5px;
}

.tn-tumbler__btn_large.tn-tumbler__btn_active:after {
  left: 33.5px;
}

.tn-tumbler__btn_active:active {
  background-color: #c02b31;
}

// .tn-tumbler__btn_active.tn-tumbler__btn_disabled {
//   background-color: #eb3b41;
// }

.tn-tumbler__btn-icon {
  position: absolute;
  top: 50%;

  transition: 0.25s;
  opacity: 0.6;
}

.tn-tumbler__btn-icon .tn-icon {
  display: block;
}

.tn-tumbler__btn_medium .tn-tumbler__btn-icon {
  right: 4px;

  margin-top: -8px;
}

.tn-tumbler__btn_large .tn-tumbler__btn-icon {
  right: 7px;
  margin-top: -10px;
}

.tn-tumbler__btn_active.tn-tumbler__btn_medium .tn-tumbler__btn-icon {
  right: 28px;
}

.tn-tumbler__btn_active.tn-tumbler__btn_large .tn-tumbler__btn-icon {
  right: 37px;
}

@keyframes focus-animation {
  from {
    outline: 1px solid #ffffff00;
    outline-offset: 1px;
  }
  to {
    outline: 1px solid #9ea5b5;
    outline-offset: 1px;
  }
}

@keyframes focus-animation-active {
  from {
    outline: 1px solid #ffffff00;
    outline-offset: 1px;
  }
  to {
    outline: 1px solid #d91921;
    outline-offset: 1px;
  }
}
</style>
