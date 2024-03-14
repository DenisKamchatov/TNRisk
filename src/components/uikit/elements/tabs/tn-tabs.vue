<script lang="ts" setup>
import { defineComponent, PropType, ref, Ref, watch } from "vue";
import TNIcon from "@/components/uikit/elements/icons/tn-icon.vue";
import { TNTabsOption } from "./typings";

const props = withDefaults(
  defineProps<{
    options: TNTabsOption[];
    soft?: boolean;
    disabled?: boolean;
    scrollIntoView?: boolean;
    size?: "md" | "lg";
  }>(),
  {
    soft: true,
    disabled: false,
    scrollIntoView: false,
    size: "md",
  }
);

const modelValue = defineModel<TNTabsOption["id"]>("modelValue", {
  default: 0,
  required: false,
});


const TNTabs: Ref<HTMLElement | null> = ref(null);

function scrollToCurrent() {
    if (props.scrollIntoView) {
    if (TNTabs.value) {
        const currentTab: HTMLElement | null = TNTabs.value?.querySelector(
        ".tn-tabs__item-" + modelValue
        );
        if (currentTab) {
        currentTab.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest"
        });
        }
    }
    }
}

function changeTab(item: TNTabsOption) {
    modelValue.value = item.id
    setTimeout(() => {
    scrollToCurrent();
    }, 1);
};

watch(
    () => modelValue,
    (newTab, oldTab) => {
    if (modelValue && newTab !== oldTab) {
        scrollToCurrent();
    }
    }
);
</script>

<template>
    <ul
      v-if="options && options.length"
      ref="TNTabs"
      class="tn-tabs"
      :class="{
        'tn-tabs_soft': soft,
        'tn-tabs_disabled': disabled,
        'tn-tabs_large': size === 'lg'
      }"
    >
      <li
        v-for="(item, key) in options"
        :key="key"
        class="tn-tabs__item"
        :class="'tn-tabs__item-' + item.id"
      >
        <button
          class="tn-tabs__item-btn"
          :class="{
            'tn-tabs__item-btn_disabled': item.disabled,
            'tn-tabs__item-btn_active': modelValue && item.id === modelValue,
            'tn-tabs__item-btn_icon': !!item.icon
          }"
          :disabled="disabled || item.disabled"
          @click="changeTab(item)"
        >
          <span v-if="item.name" class="tn-tabs__item-btn-text">
            {{ item.name }}
          </span>
          <span v-if="item.icon" class="tn-tabs__item-icon">
            <TNIcon
              :name="item.icon.name"
              :size="20"
              :style="{ color: item.icon.color }"
            />
          </span>
          <span
            v-if="item.secondaryText"
            class="tn-tabs__item-btn-secondary-text"
          >
            {{ item.secondaryText }}
          </span>
        </button>
      </li>
    </ul>
  </template>



  <style lang="css">
  .tn-tabs {
    margin: 0;
    display: inline-flex;
    border-radius: 12px;
    overflow-x: auto;
    background-color: #ffffff;
    align-items: center;
    height: 42px;
    border: 1px solid #d7dae1;
  }

  .tn-tabs::-webkit-scrollbar {
    display: none;
  }

  .tn-tabs {
    -ms-overflow-style: none;
    scrollbar-width: none;
    max-width: 100%;
  }

  .tn-tabs,
  .tn-tabs * {
    box-sizing: border-box;
  }

  .tn-tabs__item {
    display: inline-block;
    vertical-align: middle;
    flex: 0 0 auto;
    margin: 0 3px;
  }

  .tn-tabs__item-btn {
    transition: all 0.1s ease;
    user-select: none;
    border-radius: 10px;
    background-color: transparent;
    padding: 6px 16px;
    font-weight: 600;
    color: #667387;
    border: none;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    outline: none;
  }

  .tn-tabs__item-btn:hover {
    background-color: #fcfcfd;
  }

  .tn-tabs__item-btn:active {
    background-color: #f9f9fa;
  }

  .tn-tabs__item-btn_active {
    background-color: #f3f5f7;
    color: #1e2228;
  }

  .tn-tabs__item-btn_active:hover {
    background-color: #e6e8ed;
  }

  .tn-tabs__item-btn_active:active {
    background-color: #d7dae1;
  }

  .tn-tabs_disabled {
    pointer-events: none;
  }

  .tn-tabs_disabled .tn-tabs__item-btn {
    color: #bcc1ce;
  }

  .tn-tabs__item-icon {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 6px;
    transform: translateY(-2px);
    text-align: center;
  }

  .tn-tabs__item-btn-text ~ .tn-tabs__item-icon {
    margin-left: 4px;
  }

  .tn-tabs__item-btn-text,
  .tn-tabs__item-btn-secondary-text {
    display: inline-block;
    vertical-align: middle;
  }

  .tn-tabs__item-btn-secondary-text {
    color: #9ca3b6;
    font-weight: 700;
    margin-left: 4px;
    transition: color 0.1s linear;
  }

  .tn-tabs_disabled .tn-tabs__item-btn-secondary-text {
    color: #9ca3b6;
  }

  .tn-tabs__item-icon {
    margin-right: 0;
    transform: translateY(-1.5px);
  }

  .tn-tabs__item-btn_disabled {
    pointer-events: none;
  }

  /**
   Large
   */
  .tn-tabs.tn-tabs_large {
    height: 48px;
  }

  .tn-tabs_large .tn-tabs__item-btn {
    font-size: 16px;
    line-height: 21px;
    padding: 9px 16px;
  }

  /**
   * Soft
   */

  .tn-tabs_soft {
    background-color: transparent;
    border-radius: 0;
    border: none;
    height: 80px;
    background-image: linear-gradient(
      0deg,
      transparent 0px,
      transparent 3px,
      #d7dae1 3px,
      #d7dae1 4px,
      transparent 4px
    );
    background-position: bottom;
  }

  .tn-tabs_soft .tn-tabs__item-btn {
    color: #9B9FA9;
    border-radius: 0;
    font-weight: 700;
    position: relative;
    padding: 6px 0;
  }

  .tn-tabs_soft.tn-tabs_large .tn-tabs__item-btn {
    padding: 9px 0;
  }

  .tn-tabs_soft .tn-tabs__item:not(:last-child) {
    margin-right: 24px;
  }

  .tn-tabs_soft.tn-tabs_large .tn-tabs__item:not(:last-child) {
    margin-right: 16px;
  }

  .tn-tabs_soft .tn-tabs__item-btn::after {
    content: "";
    position: absolute;
    transition: background-color 0.1s linear;
    background-color: transparent;
    height: 2px;
    left: 0;
    right: 0;
    bottom: -19px;
    border-radius: 2px;
  }

  .tn-tabs_soft .tn-tabs__item-btn:hover {
    color: #444c59;
    background-color: transparent;
  }

  .tn-tabs_soft .tn-tabs__item-btn:active {
    color: #1e2228;
    background-color: transparent;
  }

  .tn-tabs_soft .tn-tabs__item-btn_active {
    box-shadow: none;
    background-color: transparent;
    color: #2E384B;
  }
  .tn-tabs_soft .tn-tabs__item-btn_active.tn-tabs__item-btn_active::after {
    background-color: #EB3B41;
  }

  /* .tn-tabs_soft .tn-tabs__item-btn_active:hover {
    color: #ae1603;
    background-color: transparent;
  } */

  .tn-tabs_soft .tn-tabs__item-btn_active:hover::after {
    background-color: #ce2b30;
  }

  /* .tn-tabs_soft .tn-tabs__item-btn_active:active {
    color: #961500;
    background-color: transparent;
  } */
/*
  .tn-tabs_soft .tn-tabs__item-btn_active:active::after {
    background-color: #961500;
  } */

  .tn-tabs__item-btn_active .tn-tabs__item-icon {
    opacity: 1;
  }

  .tn-tabs_soft.tn-tabs_disabled .tn-tabs__item-btn {
    color: #bcc1ce;
  }

  .tn-tabs_soft.tn-tabs_disabled .tn-tabs__item-btn_active {
    border-bottom-color: #bcc1ce;
  }

  .tn-tabs_soft.tn-tabs_disabled .tn-tabs__item-btn_active::after {
    background-color: #bcc1ce;
  }
  </style>
