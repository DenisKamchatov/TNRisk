<script setup lang="ts">
import { IHomepageNavFirst } from "./typings";
import { ref, Ref } from "vue";

const props = withDefaults(
  defineProps<{
    options: IHomepageNavFirst[];
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

const modelValue = defineModel<IHomepageNavFirst["urlName"]>("modelValue");

const NavFirstItems: Ref<HTMLElement | null> = ref(null);

function chooseItem(itemUrlName: IHomepageNavFirst["urlName"]) {
  modelValue.value = itemUrlName;
}
</script>

<template>
  <ul
    v-if="options && options.length"
    ref="NavFirstItems"
    class="nav-first"
    :class="{
      'nav-first_disabled': disabled,
    }"
  >
    <li
      v-for="(item, key) in options"
      :key="key"
      class="nav-first__item"
      :class="'nav-first__item-' + item.id"
    >
      <router-link
        class="nav-first__item-btn"
        :class="{
          'nav-first__item-btn_disabled': item.disabled,
          'nav-first__item-btn_active':
            modelValue && !item.disabled && !disabled && item.urlName === $route.name,
        }"
        :disabled="disabled || item.disabled"
        @click="chooseItem(item.urlName)"
        tag="button"
        :to="{ name: item.urlName}"
      >
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss">
.nav-first {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  margin: 0;
  overflow-x: auto;
}

.nav-first__item-btn {
  display: inline-block;
  vertical-align: middle;
  padding: 8px 12px;
  height: 40px;

  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  background: none;
  color: #9B9FA9;

  transition: all 0.2s ease;
  border-radius: 12px;
  white-space: nowrap;
}

.nav-first__item-btn:hover {
  color: #2E384B;
}

.nav-first__item-btn_active {
  background: #E7E9EF;
  color: #2E384B;
}

.nav-first__item-btn_active:hover {
  background: #d3d6df;
}

.nav-first_disabled .nav-first__item-btn {
  color: #d9dbe1;
}

.nav-first_disabled, .nav-first__item-btn_disabled {
  pointer-events: none;
}

.nav-first__item-btn_disabled {
  color: #d9dbe1;

}
</style>
