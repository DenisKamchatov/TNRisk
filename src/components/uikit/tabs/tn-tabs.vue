<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults, ref, Ref, watch } from "vue";
import TNIcon from "@/components/uikit/icons/tn-icon.vue";
import { TNTabsOption } from "./typings";

const props = withDefaults(
  defineProps<{
    options: Array<TNTabsOption>;
    modelValue?: string | number;
    scrollIntoView?: boolean;
  }>(),
  {
    modelValue: 0,
    scrollIntoView: false,
  }
);

const emits = defineEmits(["update:modelValue"]);

const TNTabs: Ref<HTMLElement | null> = ref(null);

function scrollToCurrent() {
  if (props.scrollIntoView) {
    if (TNTabs.value) {
      const currentTab: HTMLElement | null = TNTabs.value?.querySelector(
        ".tn-tabs__item-" + props.modelValue
      );
      if (currentTab) {
        currentTab.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }
}

function changeTab(item: TNTabsOption) {
  emits("update:modelValue", item.id);
  setTimeout(() => {
    scrollToCurrent();
  }, 1);
}

watch(
  () => props.modelValue,
  (newTab, oldTab) => {
    if (props.modelValue && newTab !== oldTab) {
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
          'tn-tabs__item-btn_active': modelValue && item.id === modelValue,
          'tn-tabs__item-btn_icon': !!item.icon,
        }"
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
      </button>
    </li>
  </ul>
</template>

<style lang="scss">
.tn-tabs {
  display: inline-flex;
  overflow-x: auto;
  align-items: center;

  margin: 0;
  padding: 0 24px;
  width: 100%;


  background-color: transparent;
  background-image: linear-gradient(
    0deg,
    transparent 0px,
    transparent 3px,
    #ffffff 3px,
    #fff 4px,
    transparent 4px
  );

  background-position: bottom;
  border-radius: 0;
  border-bottom: 1px solid #D5D7E1;
  overflow: visible;

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
  display: flex;
  position: relative;

  padding: 28px 0;

  font-size: 16px;
  line-height: 24px;
  font-weight: 600;

  background-color: transparent;
  color: #9B9FA9;

  transition: all 0.1s ease;
  user-select: none;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 0;
}

.tn-tabs__item-btn_active {
  color: #2E384B;
  background-color: transparent;

  box-shadow: none;
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

.tn-tabs__item-btn-text {
  display: inline-block;
  vertical-align: middle;
}

.tn-tabs__item-icon {
  margin-right: 0;
  transform: translateY(-1.5px);
}

.tn-tabs__item:not(:last-child) {
  margin-right: 24px;
}

.tn-tabs__item-btn::after {
  content: "";
  position: absolute;
  transition: background-color 0.1s linear;
  background-color: transparent;
  height: 2px;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 2px;
}

.tn-tabs__item-btn:hover {
  color: #2E384B;
  background-color: transparent;
}

.tn-tabs__item-btn_active.tn-tabs__item-btn_active::after {
  background-color: #EB3B41;
}

</style>
