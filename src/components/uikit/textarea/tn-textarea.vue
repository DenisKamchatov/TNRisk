<script setup lang="ts">
import {
  defineProps,
  computed,
  useSlots,
  defineEmits,
  ref,
  watch,
  onBeforeMount,
  nextTick,
  onMounted,
} from "vue";

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
    rows: number;
    cols: number;
    minHeight: number;
    maxHeight: number | null;
    autoResize: boolean;
  }>(),
  {
    required: true,
    modelValue: "",
    rows: 2,
    cols: 0,
    minHeight: 50,
    maxHeight: null,
    autoResize: true,
  }
);

const slots = useSlots();
const emits = defineEmits(["update:modelValue"]);

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
const hasLeftIcon = computed<boolean>(
  () => !!slots["icon-left"] || !!props.iconLeft
);

const textareaContent = ref<string>("");
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

watch(
  () => textareaContent.value,
  () => {
    emits("update:modelValue", textareaContent.value);
    resize();
  }
);

watch(
  () => props.modelValue,
  (val) => {
    textareaContent.value = String(val);
  }
);

onBeforeMount(() => {
  nextTick(() => {
    textareaContent.value = props.modelValue;
  });
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

const updateModelValue = (value: string) => {
  emits("update:modelValue", value);
};
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
        'tn-textarea__label_has-left-icon': hasLeftIcon,
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
      <span v-if="hasLeftIcon" class="tn-textarea__icon tn-textarea__icon_left">
        <slot name="icon-left">
          <TNIcon :name="iconLeft" />
        </slot>
      </span>

      <textarea
        class="tn-textarea__input"
        ref="textarea"
        @input="updateModelValue($event.target.value)"
        :rows="rows"
        :cols="cols"
        :placeholder="placeholder"
        wrap="hard"
        :required="required"
        @focus="onFocused = true"
        @blur="onFocused = false"
        :style="styles"
      ></textarea>

      <label
        v-if="hasFloatingLabel && !hasLabel"
        class="tn-textarea__floating-label"
        :class="{
          'tn-textarea__floating-label_on-focus': modelValue.length,
          'tn-textarea__floating-label_has-left-icon': hasLeftIcon,
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

  background-color: #f5f6fa;
  color: #171c25;
  border-radius: 12px;

  transition: 300ms;

  &:hover {
    background-color: #e9ebf1;
    transition: 300ms;
  }

  .tn-textarea__input {
    height: 100%;
    width: 100%;

    padding: 4px 0 0 0;

    font-size: 14px;
    font-weight: 400;

    background: none;
    border: none;
    outline: none;

    color: #171c25;

    &:focus + .tn-textarea__floating-label {
      top: 5px;

      margin-top: 0px;

      animation-name: size-down;
      animation-duration: 300ms;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
    }
  }

  .tn-textarea__floating-label {
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

    .tn-textarea__floating-label-star {
      color: #d91921;
    }
  }

  .tn-textarea__floating-label_has-left-icon {
    left: 50px;
  }

  .tn-textarea__floating-label_on-focus {
    top: 5px;

    margin-top: 0px;

    animation-name: size-down;
    animation-duration: 300ms;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .tn-textarea__icon {
    display: flex;
    align-items: center;

    font-size: 24px;

    color: #747c8c;
  }
}

.tn-textarea_on-focused {
  background-color: #fff;
  outline: 2px solid #fcddde;
  border: 1px solid #eb3b41;

  transition: 300ms;

  &:hover {
    background-color: #fff;
  }
}

.tn-textarea_disabled {
  color: #747c8c;
  background-color: #fafafb;

  pointer-events: none;

  .tn-textarea__floating-label {
    color: #9ea5b5;
  }
  .tn-textarea__icon {
    color: #d0d4db;
  }
  .tn-textarea__input {
    color: #747c8c;
  }

  .tn-textarea__description {
    color: #9b9fa9;
  }
}

.tn-textarea_has-label {
  .tn-textarea__input {
    padding: 0 0 0 0;

    &::placeholder {
      font-size: 14px;
      font-weight: 400;

      color: #747c8c;
    }
  }
}

.tn-textarea_has-label.tn-textarea_error {
  .tn-textarea__wrapper {
    .tn-textarea__input {
      &::placeholder {
        color: #d91921;
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

  color: #747c8c;

  .tn-textarea__label-star {
    font-size: 14px;
    font-weight: 400;

    color: #d91921;
  }
}

.tn-textarea_error {
  .tn-textarea__wrapper {
    background-color: #fff;

    outline: none;
    border: 1px solid #c02b31;

    .tn-textarea__input {
      color: #d91921;
    }

    .tn-textarea__icon {
      color: #d91921;
    }
  }

  .tn-textarea__description {
    color: #d91921;
  }
}

.tn-textarea__description {
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
