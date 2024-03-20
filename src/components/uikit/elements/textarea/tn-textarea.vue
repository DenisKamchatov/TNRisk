<script setup lang="ts">
import {
  computed,
  useSlots,
  ref,
  watch,
  nextTick,
  onMounted,
} from "vue";

const props = withDefaults(
  defineProps<{
    required?: boolean;
    floatingLabel?: string;
    label?: string;
    placeholder?: string;
    iconRight?: string;
    icon?: string;
    disabled?: boolean;
    readonly?: boolean;
    description?: string;
    error?: boolean;
    rows?: number;
    cols?: number;
    minHeight?: number;
    maxHeight?: number | null;
    autoResize?: boolean;
  }>(),
  {
    required: true,
    rows: 2,
    cols: 0,
    minHeight: 50,
    maxHeight: null,
    autoResize: true,
    readonly: false,
  }
);

const slots = useSlots();

const modelValue = defineModel("modelValue", {
  default: "",
  required: true,
});

const uniqueId = Math.floor(Math.random() * 99999) + 1;
const inputId = computed<string>(() => `tn-textarea-${uniqueId}`);
const onFocused = ref<boolean>(false);

const hasFloatingLabel = computed<boolean>(
  () => !!slots["floatingLabel"] || !!props.floatingLabel
);
const hasLabel = computed<boolean>(() => !!slots["label"] || !!props.label);
const hasRightIcon = computed<boolean>(
  () => !!slots["icon-right"] || !!props.iconRight
);
const hasIcon = computed<boolean>(() => !!slots["icon"] || !!props.icon);

const textarea = ref<HTMLTextAreaElement | null>(null);
const height = ref<string>("");
const isScrollEnabled = ref<boolean>(false);

const unit: string = "px";

const styles = computed<{
  resize: string;
  height: string;
  overflow: string;
}>(() => ({
  resize: props.autoResize ? "none !important" : "",
  height: height.value,
  overflow: `${isScrollEnabled.value ? "scroll" : "hidden"} !important`,
}));

watch(modelValue, () => {
  resize();
});

const resize = () => {
  const element = textarea.value;
  height.value = "auto !important";
  nextTick(() => {
    if (props.minHeight && element) {
      height.value = `${
        element.scrollHeight < props.minHeight
          ? props.minHeight
          : element.scrollHeight
      }${unit}`;
    }
    if (props.maxHeight && element) {
      if (element.scrollHeight > props.maxHeight) {
        height.value = `${props.maxHeight}${unit}`;
        isScrollEnabled.value = true;
      } else {
        isScrollEnabled.value = false;
      }
    }
  });
};

onMounted(() => {
  resize();
});
</script>

<template>
  <div
    class="tn-textarea"
    :class="{
      'tn-textarea_disabled': disabled,
      'tn-textarea_error': error,
      'tn-textarea_has-label': hasLabel,
    }"
  >
    <label
      v-if="hasLabel"
      class="tn-textarea__label"
      :class="{
        'tn-textarea__label_on-focus': modelValue.length,
        'tn-textarea__label_has-left-icon': hasIcon,
      }"
      :for="inputId"
    >
      <span v-if="required" class="tn-textarea__label-star">*</span>

      <slot name="label">
        {{ label }}
      </slot>
    </label>

    <div
      class="tn-textarea__wrapper"
      :class="{
        'tn-textarea_on-focused': onFocused,
      }"
    >
      <span v-if="hasIcon" class="tn-textarea__icon tn-textarea__icon_left">
        <slot name="icon">
          <TNIcon :name="icon" />
        </slot>
      </span>

      <textarea
        class="tn-textarea__input scrollbox"
        ref="textarea"
        :rows="rows"
        :cols="cols"
        :placeholder="placeholder"
        wrap="hard"
        :required="required"
        :readonly="readonly"
        @focus="onFocused = true"
        @blur="onFocused = false"
        v-model="modelValue"
        v-bind="$attrs"
        :style="styles"
      ></textarea>

      <label
        v-if="hasFloatingLabel && !hasLabel"
        class="tn-textarea__floating-label"
        :class="{
          'tn-textarea__floating-label_on-focus': modelValue.length,
          'tn-textarea__floating-label_has-left-icon': hasIcon,
        }"
        :for="inputId"
      >
        <slot name="floatingLabel">
          {{ floatingLabel }}
        </slot>
        <span v-if="required" class="tn-textarea__floating-label-star">*</span>
      </label>

      <span
        v-if="hasRightIcon"
        class="tn-textarea__icon tn-textarea__icon_right"
      >
        <slot name="icon-right">
          <TNIcon :name="iconRight" />
        </slot>
      </span>
    </div>

    <span class="tn-textarea__description">
      <slot name="description">{{ description }}</slot>
    </span>
  </div>
</template>

<style lang="scss">
.tn-textarea {
  width: 100%;
}
.tn-textarea__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 11px;

  position: relative;

  padding: 14px 16px;

  width: 100%;
  min-height: 88px;

  background-color: var(--textarea-wrapper-bg);
  color: var(--textarea-wrapper-color);
  border-radius: 12px;
  border: 1px solid transparent;
  outline: 2px solid transparent;

  transition: 300ms;

  &:hover {
    background-color: var(--textarea-wrapper-bg-hover);
    transition: 300ms;
  }

  .tn-textarea__input {
    height: 100%;
    width: 100%;

    padding: 4px 0 0 0;

    font-size: 14px;
    font-weight: 400;

    background: none;
    border: 1px solid transparent;
    outline: 2px solid transparent;

    color: var(--textarea-color);

    &:focus + .tn-textarea__floating-label {
      top: 5px;

      animation-name: size-down;
      animation-duration: 300ms;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
    }
  }

  .tn-textarea__floating-label {
    position: absolute;
    top: 18px;
    transform: scale(1);
    max-width: 80%;

    text-overflow: ellipsis;
    white-space: nowrap;

    color: var(--textarea-floating-label-color);

    transition: 300ms;
    overflow: hidden;
    pointer-events: none;

    .tn-textarea__floating-label-star {
      color: var(--textarea-floating-label-star);
    }
  }

  .tn-textarea__floating-label_has-left-icon {
    left: 52px;
  }

  .tn-textarea__floating-label_on-focus {
    top: 5px;

    animation-name: size-down;
    animation-duration: 300ms;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .tn-textarea__icon {
    display: flex;
    align-items: center;
    align-self: flex-start;

    font-size: 24px;

    color: var(--textarea-icon);
  }
}

.tn-textarea_on-focused {
  background-color: var(--textarea-focused-bg);
  outline: 2px solid var(--textarea-focused-outline);
  border: 1px solid var(--textarea-focused-border);

  transition: 200ms !important;

  &:hover {
    background-color: var(--textarea-focused-bg-hover);
  }
}

.tn-textarea_disabled {
  color: var(--textarea-disabled-color);
  background-color: var(--textarea-disabled-bg);

  pointer-events: none;

  .tn-textarea__floating-label {
    color: var(--textarea-disabled-floating-label);
  }
  .tn-textarea__icon {
    color: var(--textarea-disabled-icon);
  }
  .tn-textarea__input {
    color: var(--textarea-disabled-color);
  }

  .tn-textarea__description {
    color: var(--textarea-disabled-description);
  }
}

.tn-textarea_has-label {
  .tn-textarea__input {
    padding: 0 0 0 0;

    &::placeholder {
      font-size: 14px;
      font-weight: 400;

      color: var(--textarea-placeholder);
    }
  }
}

.tn-textarea_has-label.tn-textarea_error {
  .tn-textarea__wrapper {
    .tn-textarea__input {
      &::placeholder {
        color: var(--textarea-error-placeholder);
      }
    }
  }
}

.tn-textarea__label {
  display: flex;
  align-items: center;
  gap: 3px;
  margin: 0 0 4px 0;

  font-size: 14px;
  font-weight: 600;

  color: var(--textarea-label);

  .tn-textarea__label-star {
    font-size: 14px;
    font-weight: 400;

    color: var(--textarea-label-star);
  }
}

.tn-textarea_error {
  .tn-textarea__wrapper {
    background-color: var(--textarea-error-bg);

    outline: 2px solid transparent;
    border: 1px solid var(--textarea-error-border);

    .tn-textarea__input {
      color: var(--textarea-error-color);
    }

    .tn-textarea__icon {
      color: var(--textarea-error-icon);
    }
  }

  .tn-textarea__description {
    color: var(--textarea-error-description);
  }
}

.tn-textarea__description {
  margin: 4px 0 0 0;

  font-size: 12px;
  font-weight: 400;

  color: var(--textarea-description);
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
