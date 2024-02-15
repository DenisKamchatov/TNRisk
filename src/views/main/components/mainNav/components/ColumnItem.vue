<script setup lang="ts">
import { IMenuItemData } from "@/typings/menuData";

import tnBadge from "@/components/uikit/badge/tn-badge.vue";

const { item, isBig } = withDefaults(
  defineProps<{
    item: IMenuItemData;
    isBig?: boolean;
  }>(),
  {
    isBig: false,
  }
);
</script>

<template>
  <div class="column__item" :class="{ column__item_big: isBig }">
    <router-link v-if="item.to" class="column__item-wrapper" :to="item.to">
      <div class="column__item-icon" v-if="item.icon">
        <TNIcon :name="item.icon" :size="24" />
      </div>
      <div class="column__item-text">
        <p class="column__item-title">{{ item.title }}</p>
        <p v-if="isBig" class="column__item-subtitle">
          {{ item.subtitle }}
        </p>
      </div>

      <div v-if="item.badge && +item.badge" class="column__item-badge">
        {{ item.badge }}
      </div>
    </router-link>

    <a class="column__item-wrapper" v-else-if="item.href" :href="item.href">
      <div class="column__item-icon" v-if="item.icon">
        <TNIcon :name="item.icon" :size="24" />
      </div>
      <div class="column__item-text">
        <p class="column__item-title">{{ item.title }}</p>
        <p v-if="isBig" class="column__item-subtitle">
          {{ item.subtitle }}
        </p>
      </div>

      <tnBadge
        v-if="item.badge && +item.badge"
        size="lg"
        classic
        :badge="item.badge"
      />
    </a>

    <div class="column__item-wrapper" v-else>
      <div class="column__item-icon" v-if="item.icon">
        <TNIcon :name="item.icon" :size="24" />
      </div>
      <div class="column__item-text">
        <p class="column__item-title">{{ item.title }}</p>
        <p v-if="isBig" class="column__item-subtitle">
          {{ item.subtitle }}
        </p>
      </div>

      <div v-if="item.badge && +item.badge" class="column__item-badge">
        {{ item.badge }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.column__item {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  min-height: 48px;

  padding: 12px 24px 12px 16px;

  font-size: 24px;

  border-radius: 12px;
  transition: 300ms;
  cursor: pointer;

  &:hover {
    background-color: #f5f6fa;

    transition: 300ms;
  }

  &:not(:first-of-type) {
    margin: 8px 0 0 0;
  }

  .column__item-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;

    color: #2e384b;
  }

  .column__item-icon {
    min-width: 24px;
    max-width: 24px;
  }

  .column__item-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .column__item-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;

    color: #2e384b;
  }

  .column__item-subtitle {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;

    color: #747c8c;
  }
}

.column__item_big {
  min-height: 80px;
  padding: 12px 16px;

  background-color: #fff;

  border-radius: 12px;

  &:hover {
    background-color: #fff;
    box-shadow: 0px 2px 8px 0px rgba(46, 56, 75, 0.08),
      0px 0px 1px 0px rgba(46, 56, 75, 0.24),
      0px 6px 58px 0px rgba(121, 145, 173, 0.19);
  }
}
</style>
