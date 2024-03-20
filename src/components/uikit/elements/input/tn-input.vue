<script setup lang="ts">
import { computed, useSlots, ref } from "vue";
import TnLoader from "@/components/uikit/elements/loader/tn-loader.vue";

const props = withDefaults(
  defineProps<{
    required?: boolean;
    floatingLabel?: string;
    label?: string;
    placeholder?: string;
    icon?: string;
    iconRight?: string;
    disabled?: boolean;
    description?: string;
    error?: boolean;
    readonly?: boolean;
    clearable?: boolean;
    isModelValueArray?: boolean;
    loading?: boolean;
  }>(),
  {
    required: true,
    readonly: false,
    clearable: true,
    isModelValueArray: false,
    loading: false,
  }
);

const slots = useSlots();
const emits = defineEmits(["clear"]);
const input = ref<HTMLInputElement | null>(null);

defineExpose({
  input: input
})

const modelValue = defineModel<string>("modelValue", {
  type: String,
  default: "",
});

const uniqueId = Math.floor(Math.random() * 99999) + 1;
const inputId = computed<string>(() => `tn-input-${uniqueId}`);
const isFocused = ref<boolean>(false);

const hasFloatingLabel = computed<boolean>(
  () => !!slots["floatingLabel"] || !!props.floatingLabel
);
const hasLabel = computed<boolean>(() => !!slots["label"] || !!props.label);
const hasRightIcon = computed<boolean>(
  () => !!slots["icon-right"] || !!props.iconRight
);
const hasIcon = computed<boolean>(
  () => !!slots["icon"] || !!props.icon
);
const hasChosenItems = computed<boolean>(() => props.isModelValueArray);

const placeholderOutput = computed<string>(() => {
  return (hasFloatingLabel.value && !isFocused.value) ? "" : props.placeholder ?? "";
});

function clearModelValue() {
  emits("clear");
  input.value?.focus();
}
</script>

<template>
  <div
    class="tn-input"
    :class="{
      'tn-input_disabled': disabled,
      'tn-input_error': error,
      'tn-input_has-label': hasLabel,
      'tn-input_has-floating-label': hasFloatingLabel,
    }"
  >
    <label
      v-if="hasLabel"
      class="tn-input__label"
      :class="{
        'tn-input__label_on-focus': modelValue?.length,
        'tn-input__label_has-left-icon': hasIcon,
      }"
      :for="inputId"
    >
      <span v-if="required" class="tn-input__label-star">*</span>

      <slot name="label">
        {{ label }}
      </slot>
    </label>

    <div
      class="tn-input__wrapper"
      :class="{
        'tn-input_on-focused': isFocused,
      }"
    >
      <span v-if="hasIcon" class="tn-input__icon tn-input__icon_left">
        <slot name="icon">
          <TNIcon :name="icon" />
        </slot>
      </span>

      <div class="tn-input__input-wrapper">
        <input
          :id="inputId"
          class="tn-input__input"
          ref="input"
          type="text"
          :required="required"
          :placeholder="!hasChosenItems ? placeholderOutput : ''"
          v-model="modelValue"
          @focus="isFocused = true"
          @blur="isFocused = false"
          :readonly="readonly"
          v-bind="$attrs"
        />

        <label
          v-if="hasFloatingLabel && !hasLabel && !hasChosenItems"
          class="tn-input__floating-label"
          :class="{
            'tn-input__floating-label_on-focus': modelValue?.length,
            'tn-input__floating-label_has-left-icon': hasIcon,
          }"
          :for="inputId"
        >
          <slot name="floatingLabel">
            {{ floatingLabel }}
          </slot>
          <span v-if="required" class="tn-input__floating-label-star">*</span>
        </label>

        <transition
          name="tn-input__close-button"
          v-if="hasChosenItems"
        >
          <slot name="chosen-items"></slot>
        </transition>
      </div>

      <!-- TODO: Сделать анимацию плавной -->
      <transition
        name="tn-input__close-button"
        :style="{ opacity: hasChosenItems ? 0 : 1 }"
      >
      <span v-if="loading" class="tn-input__loader">
        <TnLoader class="tn-input__loader-icon" />
      </span>
        <button
          type="button"
          @click.stop="clearModelValue"
          @keyup.stop="clearModelValue"
          class="tn-input__close-button"
          v-else-if="modelValue && !disabled"
        >
          <TNIcon name="x" />
        </button>

        <span v-else-if="hasRightIcon" class="tn-input__icon tn-input__icon_right">
          <slot name="icon-right">
            <TNIcon :name="iconRight" />
          </slot>
        </span>
      </transition>

    </div>

    <span class="tn-input__description">
      <slot name="description">{{ description }}</slot>
    </span>
  </div>
</template>

<style lang="scss">

.tn-input {
  width: 100%;
}

.tn-input_has-floating-label .tn-input__wrapper .tn-input__input {
  padding: 12px 0 0 0;
}

.tn-input__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 11px;

  position: relative;

  padding: 0 15px;

  height: 48px;
  width: 100%;

  background-color: var(--input-wrapper-bg);
  color: var(--input-wrapper-color);
  border-radius: 12px;
  border: 1px solid transparent;
  outline: 2px solid transparent;

  transition: 300ms;

  &:hover {
    background-color: var(--input-wrapper-bg-hover);
    transition: 300ms;
  }


}

.tn-input__input {
  height: 100%;
  width: 100%;

  background: none;
  border: none;
  outline: none;

  transition: 300ms;

  &:focus + .tn-input__floating-label {
    top: 5px;

    margin-top: 0px;

    animation-name: size-down;
    animation-duration: 300ms;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}

.tn-input__input-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  font-size: 14px;
  font-weight: 400;

  background: none;
  border: none;
  outline: none;

  color: var(--input-color);
}

.tn-input__floating-label {
  position: absolute;
  top: 50%;
  left: 0;
  transform: scale(1);
  max-width: 80%;

  margin-top: -9px;

  text-overflow: ellipsis;
  white-space: nowrap;

  color: var(--input-floating-label-color);

  transition: 300ms;
  overflow: hidden;
  pointer-events: none;

  .tn-input__floating-label-star {
    color: var(--input-floating-label-star);
  }
}

.tn-input__floating-label_on-focus {
  top: 5px;

  margin-top: 0px;

  animation-name: size-down;
  animation-duration: 300ms;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.tn-input__icon {
  display: flex;
  align-items: center;

  font-size: 24px;

  color: var(--input-icon);
}

.tn-input_on-focused {
  background-color: var(--input-focused-bg);
  outline: 2px solid var(--input-focused-outline);
  border: 1px solid var(--input-focused-border);

  transition: 200ms !important;

  &:hover {
    background-color: var(--input-focused-bg-hover);
  }
}

.tn-input_disabled {
  .tn-input__wrapper {
    color: var(--input-disabled-color);
    background-color: var(--input-disabled-bg);

    pointer-events: none;

    .tn-input__floating-label {
      color: var(--input-disabled-floating-label);
    }
    .tn-input__icon {
      color: var(--input-disabled-icon);
    }
    .tn-input__input {
      color: var(--input-disabled-color);
    }

    .tn-input__description {
      color: var(--input-disabled-description);
    }
  }
  .tn-input__description {
    color: var(--input-disabled-description);
  }
}

.tn-input_has-label {
  .tn-input__input {
    padding: 0 0 0 0;

    &::placeholder {
      font-size: 14px;
      font-weight: 400;

      color: var(--input-placeholder);
    }
  }
}

.tn-input_has-label.tn-input_error {
  .tn-input__wrapper {
    .tn-input__input {

      &::placeholder {
        color: var(--input-error-placeholder);
      }
    }
  }
}

.tn-input__label {
  display: flex;
  align-items: center;
  gap: 3px;
  margin: 0 0 4px 0;

  font-size: 14px;
  font-weight: 600;

  color: var(--input-label);

  .tn-input__label-star {
    font-size: 14px;
    font-weight: 400;

    color: var(--input-label-star);
  }
}

.tn-input_error {
  .tn-input__wrapper {
    background-color: var(--input-error-bg);

    outline: 2px solid transparent;
    border: 1px solid var(--input-error-border);

    .tn-input__input {
      color: var(--input-error-color);
    }

    .tn-input__icon {
      color: var(--input-error-icon);
    }
  }

  .tn-input__description {
    color: var(--input-error-description);
  }
}

.tn-input__description {
  margin: 4px 0 0 0;

  font-size: 12px;
  font-weight: 400;

  color: var(--input-description);
}



.tn-input__close-button {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  width: 18px;
  height: 18px;

  font-size: 14px;

  color: var(--input-close-color);
  background-color: var(--input-close-bg);
  border: 1px solid transparent;

  border-radius: 50%;
  cursor: pointer;
  transition: 300ms;

  &:focus {
    border: 1px solid var(--input-close-border-focus);
    transition: 300ms;
  }
}

.tn-input__loader {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);

  .tn-input__loader-icon {
    font-size: 24px;
  }
  .tn-loader__spinner {
      border-color: var(--input-loading);
      border-top-color: transparent;
    }
}


.tn-input__close-button-enter-active,
.tn-input__close-button-leave-active {
  transition: opacity 0s ease;
}

.tn-input__close-button-enter-from,
.tn-input__close-button-leave-to {
  opacity: 0;
}



@keyframes size-down {
  from {
    font-size: 14px;
  }

  to {
    font-size: 12px;
  }
}
</style>
