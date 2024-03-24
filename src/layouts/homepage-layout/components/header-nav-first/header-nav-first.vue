<script setup lang="ts">
import { IHomepageNavFirst } from "./typings";
import { ref, Ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = withDefaults(
  defineProps<{
    options: IHomepageNavFirst[];
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);
</script>

<template>
  <ul
    v-if="options && options.length"
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
            !item.disabled && !disabled && item.urlName === $route.name,
        }"
        :tabindex="disabled || item.disabled ? -1 : 0"
        :disabled="disabled || item.disabled"
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
  padding: 2px;
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
  color: var(--header-nav-first-color);

  transition: all 0.2s ease;
  border-radius: 12px;
  white-space: nowrap;

  &:hover {
    color: var(--header-nav-first-color-hover);
  }

  &:focus {
    animation: focus-animation-secondary 500ms ease forwards;
    transition: 300ms;
  }
}

.nav-first__item-btn_active {
  background: var(--header-nav-first-active-bg);
  color: var(--header-nav-first-active-color);

  &:hover {
    background: var(--header-nav-first-active-bg-hover);
  }
}

.nav-first_disabled .nav-first__item-btn {
  color: var(--header-nav-first-disabled-color);
}

.nav-first_disabled, .nav-first__item-btn_disabled {
  pointer-events: none;
}

.nav-first__item-btn_disabled {
  color: var(--header-nav-first-disabled-color);
}


@keyframes focus-animation-secondary {
  from {
    outline: var(--header-nav-first-animation-outline-from);
    outline-offset: 1px;
  }
  to {
    outline: var(--header-nav-first-animation-outline-to);
    outline-offset: 1px;
  }
}
</style>
