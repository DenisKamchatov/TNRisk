<script setup lang="ts">
import { defineProps, computed, useSlots, defineEmits, ref } from "vue";

const props = withDefaults(
  defineProps<{
    required?: boolean;
    floatingLabel?: string;
    label?: string;
    placeholder?: string;
    modelValue?: string;
    iconRight?: string;
    iconLeft?: string;
    disabled?: boolean;
    description?: string;
    error?: boolean;
  }>(),
  {
    required: true,
    modelValue: "",
  }
);

const slots = useSlots();
const emits = defineEmits(["update:modelValue"]);

const uniqueId = Math.floor(Math.random() * 99999) + 1;
const inputId = computed<string>(() => `tn-input-${uniqueId}`);
const onFocused = ref<boolean>(false);

const hasFloatingLabel = computed<boolean>(
  () => !!slots["floatingLabel"] || !!props.floatingLabel
);
const hasLabel = computed<boolean>(() => !!slots["label"] || !!props.label);
const hasRightIcon = computed<boolean>(
  () => !!slots["icon-right"] || !!props.iconRight
);
const hasLeftIcon = computed<boolean>(
  () => !!slots["icon-left"] || !!props.iconLeft
);

const updateModelValue = (value: string) => {
  emits("update:modelValue", value);
};
</script>

<template>
  <div
    class="tn-input"
    :class="{
      'tn-input_disabled': disabled,
      'tn-input_error': error,
      'tn-input_has-label': hasLabel,
    }"
  >
    <label
      v-if="hasLabel"
      class="tn-input__label"
      :class="{
        'tn-input__label_on-focus': modelValue.length,
        'tn-input__label_has-left-icon': hasLeftIcon,
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
        'tn-input_on-focused': onFocused,
      }"
    >
      <span v-if="hasLeftIcon" class="tn-input__icon tn-input__icon_left">
        <slot name="icon-left">
          <TNIcon :name="iconLeft" />
        </slot>
      </span>

      <input
        :id="inputId"
        class="tn-input__input"
        type="text"
        :required="required"
        :value="props.modelValue"
        :placeholder="placeholder"
        @input="updateModelValue($event.target.value)"
        @focus="onFocused = true"
        @blur="onFocused = false"
      />
      
      <label
        v-if="hasFloatingLabel && !hasLabel"
        class="tn-input__floating-label"
        :class="{
          'tn-input__floating-label_on-focus': modelValue.length,
          'tn-input__floating-label_has-left-icon': hasLeftIcon,
        }"
        :for="inputId"
      >
        <slot name="floatingLabel">
          {{ floatingLabel }}
        </slot>
        <span v-if="required" class="tn-input__floating-label-star">*</span>
      </label>

      <span v-if="hasRightIcon" class="tn-input__icon tn-input__icon_right">
        <slot name="icon-right">
          <TNIcon :name="iconRight" />
        </slot>
      </span>
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

.tn-input__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 11px;

  position: relative;

  padding: 0 15px;

  height: 54px;
  width: 100%;

  background-color: #f5f6fa;
  color: #171c25;
  border-radius: 12px;

  transition: 300ms;

  &:hover {
    background-color: #e9ebf1;
    transition: 300ms;
  }

  .tn-input__input {
    height: 100%;
    width: 100%;

    padding: 4px 0 0 0;

    font-size: 14px;
    font-weight: 400;

    background: none;
    border: none;
    outline: none;

    color: #171c25;

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

  .tn-input__floating-label {
    position: absolute;
    top: 50%;
    transform: scale(1);
    max-width: 80%;

    margin-top: -9px;

    text-overflow: ellipsis;
    white-space: nowrap;

    color: #9ea5b5;

    transition: 300ms;
    overflow: hidden;
    pointer-events: none;

    .tn-input__floating-label-star {
      color: #d91921;
    }
  }

  .tn-input__floating-label_has-left-icon {
    left: 50px;
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

    color: #747c8c;
  }
}

.tn-input_on-focused {
  background-color: #fff;
  outline: 2px solid #fcddde;
  border: 1px solid #eb3b41;

  transition: 300ms;

  &:hover {
    background-color: #fff;
  }
}

.tn-input_disabled {
  .tn-input__wrapper {
    color: #9B9FA9;
    background-color: #fafafb;

    pointer-events: none;

    .tn-input__floating-label {
      color: #9EA5B5;
    }
    .tn-input__icon {
      color: #d0d4db;
    }
    .tn-input__input {
      color: #747c8c;
    }

    .tn-input__description {
      color: #9b9fa9;
    }
  }
  .tn-input__description {
    color: #9B9FA9;
  }
}

.tn-input_has-label {
  .tn-input__input {
    padding: 0 0 0 0;

    &::placeholder {
      font-size: 14px;
      font-weight: 400;

      color: #747c8c;
    }
  }
}

.tn-input_has-label.tn-input_error {
  .tn-input__wrapper {
    .tn-input__input {

      &::placeholder {
        color: #d91921;
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

  color: #747c8c;

  .tn-input__label-star {
    font-size: 14px;
    font-weight: 400;

    color: #d91921;
  }
}

.tn-input_error {
  .tn-input__wrapper {
    background-color: #fff;

    outline: none;
    border: 1px solid #c02b31;

    .tn-input__input {
      color: #d91921;
    }

    .tn-input__icon {
      color: #d91921;
    }
  }

  .tn-input__description {
    color: #d91921;
  }
}

.tn-input__description {
  margin: 4px 0 0 0;

  font-size: 12px;
  font-weight: 400;

  color: #747c8c;
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
