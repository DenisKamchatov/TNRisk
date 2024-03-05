<script lang="ts" setup>
import { computed, ref, unref, useSlots } from "vue";
import TNIcon from "@/components/uikit/icons/tn-icon.vue";
// import TnCell from "../cell/cell.vue";
import { ICellDataItem } from "./typings";
import { Dropdown } from "floating-vue";

const props = withDefaults(
  defineProps<{
    description?: string;
    nothingFoundTitle?: string;
    placeholder?: string;
    result?:
      | {
          title: string;
          id: string;
        }[]
      | ICellDataItem[]
      | null;
    resultMaxHeight?: string | number;
    loading?: boolean;
    cell?: boolean;
    showResult?: boolean;
    rightButtonIcon?: string;
    light?: boolean;
  }>(),
  {
    description: "",
    placeholder: "Найти",
    nothingFoundTitle: "",
    result: null,
    resultMaxHeight: 360,
    rightButtonIcon: "x",
    light: true,
  }
);

const modelValue = defineModel({
  default: "",
});

const emits = defineEmits([
  "update:modelValue",
  "blur",
  "focus",
  "enter",
  "click:outside",
  "select",
  "click:rightButton",
]);

const slots = useSlots();

const savedResult = ref<
  | {
      title: string;
      id: string;
    }[]
  | ICellDataItem[]
>([]);

const isPopperShown = ref<boolean>(false);
const isInputActive = ref<boolean>(!!modelValue.value)
const overlapModelValue = ref<string | null>(null);

const descriptionText = computed<string>(() => {
  if (props.result && !props.result.length && props.showResult) {
    return props.nothingFoundTitle;
  }
  return props.description;
});

const haveValueSlot = computed<boolean>(() => !!slots.value);

const showInlineResult = computed<boolean>(() => {
  if (props.showResult && modelValue.value && props.result) {
    return true;
  }
  return false;
});

const focusHandler = (event: FocusEvent) => {
  emits("focus", (event.target as HTMLInputElement).value);
  isInputActive.value = true;
  isPopperShown.value = true;
};

const blurHandler = (event: FocusEvent) => {
  emits("blur", (event.target as HTMLInputElement).value);
  isPopperShown.value = false;
  isInputActive.value = !!modelValue.value;

};

// TODO: Подумать нужна ли эта функция и переменная savedResult
const clickOutsideHandler = () => {
  if (props.result) {
    if (!haveValueSlot.value) {
      savedResult.value = [...props.result];
    }
    emits("click:outside", modelValue);
    if (!haveValueSlot.value) {
      setTimeout(() => {
        savedResult.value = [];
      }, 300);
    }
  }
};

const selectHandler = (value: string) => {
  emits("select", value);
};

const rightButtonClickHandler = (event: MouseEvent) => {
  emits("click:rightButton", event);
};


const listOutput = computed(() => {
  return props.result
    ? props.result
    : savedResult.value;
});

const highlightedElement = ref<{
      title: string;
      id: string;
    } | ICellDataItem | null>();

function arrowKeyHandler(direction: "up" | "down") {
  if (props.result && props.result.length && modelValue.value) {
    if (direction === "up") {
      if (highlightedElement.value) {
        const index = unref(listOutput.value).findIndex(
          (el) => el === highlightedElement.value
        );
        if (index > 0) {
          highlightedElement.value = unref(listOutput.value)[index - 1];
        }
      }
      if (!highlightedElement.value || index === 0) {
        highlightedElement.value = unref(listOutput.value)[
          unref(listOutput.value).length - 1
        ];
      }

    } else if (direction === "down") {
      if (highlightedElement.value) {
        const index = unref(listOutput.value).findIndex(
          (el) => el === highlightedElement.value
        );
        if (index < unref(listOutput.value).length - 1) {
          highlightedElement.value = unref(listOutput.value)[index + 1];
        }
      }
      if (!highlightedElement.value || index === unref(listOutput.value).length - 1) {
        highlightedElement.value = unref(listOutput.value)[0];
      }

      overlapModelValue.value = highlightedElement.value.title;
    }

    overlapModelValue.value = highlightedElement.value.title;
  }
}

function onEnter() {
  modelValue.value = highlightedElement.value?.title || modelValue.value;

  highlightedElement.value = null;
  selectHandler(modelValue.value);
}

function onEsc() {
  overlapModelValue.value = null;
  highlightedElement.value = null;
}

function onInput(value: string) {
  modelValue.value = value;
  emits('update:modelValue', value)

  overlapModelValue.value = null;
  highlightedElement.value = null;
}
</script>

<template>
  <form
    v-click-outside="clickOutsideHandler"
    class="tn-search"
    @keydown.enter.prevent
  >
    <Dropdown
      :arrow-overflow="true"
      :triggers="[]"
      :shown="showInlineResult"
      :autoHide="false"
      placement="bottom-start"
    >
      <div class="tn-search__container">
        <div
          class="tn-search__input-container"
          :class="{
              'tn-search__input-container_light': light,
          }"
        >
          <input
            class="tn-search__inner-input"
            :class="{
              'tn-search__inner-input_active': isInputActive,
            }"
            type="search"
            autocorrect="off"
            autocomplete="off"
            aria-autocomplete="none"
            spellcheck="false"
            tabindex="0"
            :placeholder="isInputActive ? placeholder : ''"
            :value="overlapModelValue || modelValue"
            @blur="blurHandler"
            @focus="focusHandler"
            @input="onInput($event.target.value)"
            @keyup.enter.prevent="onEnter"
            @keydown.esc.prevent="onEsc"
            @keydown.up="arrowKeyHandler('up')"
            @keydown.down="arrowKeyHandler('down')"
          />
          <TNIcon class="tn-search__search-icon" name="search" />
          <!-- @input="$emit('update:modelValue', onInput($event.target.value))" -->
          <!-- @input="$emit('update:modelValue', $event.target.value)" -->
          <transition name="tn-search__right-button-icon">
            <TNIcon
              v-if="rightButtonIcon && !showResult && !modelValue"
              class="tn-search__right-button-icon"
              :name="rightButtonIcon"
              @click="rightButtonClickHandler"
            />
          </transition>
        </div>
      </div>
      <template #popper v-if="isPopperShown">
        <div
          class="tn-search__result-container"
          :style="{ maxHeight: resultMaxHeight + 'px' }"
        >
          <p
            v-if="(!result?.length && !savedResult.length) || loading"
            class="tn-search__hint"
            :class="{ 'tn-search__hint_load': loading }"
          >
            {{ descriptionText }}
            <!-- <transition name="tn-search__loading-icon"> -->
            <TNIcon
              v-if="loading"
              class="tn-search__loading-icon"
              name="load"
            />
            <!-- </transition> -->
          </p>
          <ul
            v-else-if="result?.length || savedResult.length"
            class="tn-search__result-list"
          >
            <li
              v-for="resultItem in listOutput"
              :key="resultItem.id"
              class="tn-search__result-item"
              :class="{
                'tn-search__result-item_highlighted': highlightedElement === resultItem
              }"
              @mousedown="selectHandler(resultItem.title)"
              v-close-popper
            >
              {{ resultItem.title }}
            </li>
          </ul>
        </div>
      </template>
    </Dropdown>
  </form>
</template>

<style lang="scss">
.tn-search {
  font-family: "Proxima Nova", sans-serif, system-ui;
  position: relative;
  width: 100%;
}

.tn-search__container {
  width: 100%;
}

.tn-search__container,
.tn-search__input-container {
  display: flex;
}

.tn-search__input-container {
  position: relative;
  flex: 1 0;
  width: 100%;
}

.tn-search__inner-input {
  font-weight: 400;
  max-width: 48px;
  width: 48px;
  height: 48px;
  background-color: #F5F6FA;
  border: 1px solid transparent;
  border-radius: 10px;
  outline: 2px solid transparent;
  font-size: 14px;
  line-height: 22px;
  color: #2E384B;
  transition: 0.3s;
  box-sizing: border-box;
  background-position: 12px center;
  background-repeat: no-repeat;
  // padding: 12px 12px 12px 48px;
  padding: 12px 12px 12px 12px;
  // background-image: url("data:image/svg+xml,%3Csvg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13 7.5C13 10.5376 10.5376 13 7.5 13C4.46243 13 2 10.5376 2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5ZM12.3266 13.2408C11.0222 14.3386 9.33833 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 9.08208 14.5101 10.5498 13.6738 11.7596L16.2071 14.2929C16.5976 14.6834 16.5976 15.3166 16.2071 15.7071C15.8166 16.0976 15.1834 16.0976 14.7929 15.7071L12.3266 13.2408Z' fill='%23667387'/%3E%3C/svg%3E%0A");

  cursor: pointer;

  &::placeholder {
    opacity: 0;
    transition: 500ms;
  }
}

.tn-search__input-container_light {
  .tn-search__inner-input {
    background-color: #FFFFFF;

    &:hover {
    background-color: #FFFFFF;

      border: 1px solid #dfe2e7;
      transition: 300ms;
    }

    &:focus {
      background-color: #FFFFFF;
      border-color: #e63f46;
      outline: 2px solid #fcddde;
      color: #2E384B;
    }
  }
  .tn-search__search-icon {
      color: #2E384B;
    }
}


.tn-search__inner-input_active {
  padding: 12px 12px 12px 48px;
  max-width: 300px;
  width: 300px;

  cursor: text;

  &::placeholder {
    opacity: 1;
    transition: 500ms;
  }
}

.tn-search__search-icon {
  position: absolute;
  left: 12px;
  top: 50%;

  font-size: 24px;

  color: #747C8C;

  transform: translateY(-50%);
  pointer-events: none;
}

.tn-search__inner-input::-webkit-search-decoration {
  display: none;
}

.tn-search__inner-input:hover {
  color: #171C25;
  background-color: #e9ebf1;
}

.tn-search__inner-input:focus {
  background-color: #FFFFFF;
  border-color: #e63f46;
  outline: 2px solid #fcddde;
  color: #2E384B;
}

.tn-search__inner-input::-ms-clear {
  display: none;
}

.tn-search__inner-input::placeholder {
  color: #747C8C;
}

.tn-search__inner-input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM6.07741 6.07741C6.40285 5.75197 6.93049 5.75197 7.25592 6.07741L10 8.82149L12.7441 6.07741C13.0695 5.75197 13.5972 5.75197 13.9226 6.07741C14.248 6.40285 14.248 6.93049 13.9226 7.25592L11.1785 10L13.9226 12.7441C14.248 13.0695 14.248 13.5972 13.9226 13.9226C13.5972 14.248 13.0695 14.248 12.7441 13.9226L10 11.1785L7.25592 13.9226C6.93049 14.248 6.40285 14.248 6.07741 13.9226C5.75197 13.5972 5.75197 13.0695 6.07741 12.7441L8.82149 10L6.07741 7.25592C5.75197 6.93049 5.75197 6.40285 6.07741 6.07741Z' fill='%239CA3B6'/%3E%3C/svg%3E%0A");
  background-position: center;
  background-size: 20px;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  margin: 0;
}

.tn-search__right-button-icon {
  color: #9EA5B5;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  cursor: pointer;
}

.tn-search__result-container {
  width: 100%;
  max-width: 580px;

  padding: 8px 12px;

  background-color: #ffffff;
  box-shadow: 0px 6px 58px 0px #7991ad30;
}

.tn-search__result-list {
  width: 100%;
}

.tn-search__result-item {
  padding: 14px 12px;

  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: #2e384b;

  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    background-color: #f5f6fa;

    transition: 300ms;
  }
}

.tn-search__result-item_highlighted {
  background-color: #f5f6fa;
}

.tn-search__hint {
  padding: 12px;
  color: var(--content-secondary-enabled);
  position: relative;
  transition: color 0.1s linear;
}

.tn-search__hint_load {
  color: transparent;
  height: 24px;
}

.tn-search__loading-icon {
  transition: color 0.1s linear;
  color: var(--content-secondary-enabled);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
