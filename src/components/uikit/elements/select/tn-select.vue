<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Dropdown } from 'floating-vue';
import TnInput from '../input/tn-input.vue';
import { ITnSelectItem } from './typings';

type SearchFunctionType = (value: string) => Promise<ITnSelectItem[]>;

const props = withDefaults(
  defineProps<{
    options: ITnSelectItem[];
    label?: string;
    floatingLabel?: string;
    placeholder?: string;

    icon?: string;
    clearable?: boolean;
    block?: boolean;

    error?: boolean;
    description?: string;
    hideDetails?: boolean;

    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;

    search?: boolean | SearchFunctionType;

    scrollable?: boolean;
  }>(),
  {
    clearable: true,
    disabled: false,
    readonly: false,
    required: false,
    search: false,
    openable: true,
    scrollable: false,
  }
);

defineEmits(["open"]);

const modelValue = defineModel<ITnSelectItem | null>("modelValue");

const textInputValue = computed<string>(() => {
  return modelValue.value?.label ?? "";
});

const isOpen = ref(false);

const searchHintShown = ref(false);
const searchOutput = ref<ITnSelectItem[]>([]);
const isTyping = ref(false);

const outputArray = computed(() => {
  if (isTyping.value) {
    return searchOutput.value.length > 0 ? searchOutput.value : props.options;
  }
  return props.options;
});

function checkSelectedOption(v: ITnSelectItem) {
  return modelValue.value && v === modelValue.value;
}

function clearValue() {
  modelValue.value = null;
}

onMounted(() => {
  console.log("tn-select: mounted", props.options);
});
</script>

<template>
  <div class="tn-select" :class="{
    'tn-select_disabled': disabled,
    'tn-select_error': error,
    'tn-select_block': block,
    'tn-select_open': isOpen,
  }">
    <Dropdown
      no-auto-focus
      :placement="`bottom-start`"
      :disabled="disabled"
      auto-size
    >
      <TnInput
        :label="label"
        :floatingLabel="floatingLabel"
        v-model="textInputValue"
        clearable @clear="clearValue"
        readonly
        block
        :required="required"
        :placeholder="placeholder"
        :error="error"
        :description="description"
        v-bind="$attrs"
      >
        <template #icon-right>
          <slot name="icon-right">
            <TNIcon
              class="tn-select__arrow"
              name="chevron-down"
            />
          </slot>
        </template>
      </TnInput>
      <template #popper="{ shown }">
        <div class="tn-select__dropdown" @mousedown.prevent>
          <div class="tn-select__dropdown-inner" :data-shown="isOpen = shown">
            <div :class="{ 'tn-select__dropdown-inner_scrollable': scrollable }">
              <slot name="dropdown">
                <p v-if="searchHintShown" class="tn-select__search-hint">
                  Начните вводить для поиска
                </p>
                <div class="tn-select__options">
                  <button
                    v-for="item in outputArray"
                    :key="`tnso-${String(item.id)}`"
                    class="tn-select__dropdown-item"
                    :class="{
                      'tn-select__dropdown-item_selected': checkSelectedOption(item),
                      'tn-select__dropdown-item_disabled': item.disabled,
                    }"
                    :disabled="item.disabled"
                    @click="modelValue = item"
                    v-close-popper
                  >
                    <slot name="option-item" :item="item">
                      <div class="tn-select__item-name">{{ item.label }}</div>
                    </slot>
                  </button>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<style lang="scss">
.tn-select {
  display: inline-block;
}

.tn-select_block {
  width: 100%;
}

.tn-select__options {
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 12px;
}

.tn-select__arrow {
  position: relative;
  transform: translate3d(0, 0, 0);
  transition: transform 0.15s 0s ease;
}

.tn-select__dropdown-item {
  display: flex;
  padding: 14px 12px;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;

  width: 100%;

  border-radius: 12px;
  background-color: #fff;
  transition: all .15s 0s ease;

  &:hover:not(.tn-select__dropdown-item_disabled) {
    background-color: var(--Light-Gray-2, #F5F6FA);
  }

  &.tn-select__dropdown-item_disabled {
    opacity: .5;
  }
}


.tn-select_open {
  .tn-select__arrow {
    transform: rotate(-180deg);
  }
}
</style>
