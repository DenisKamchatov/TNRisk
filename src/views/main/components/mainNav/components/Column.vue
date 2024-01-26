<script setup lang="ts">
import { IMenucColumnData } from "../../../typings/menuData.ts";
import ColumnItem from "./ColumnItem.vue";

const { column, isBig } = withDefaults(
  defineProps<{
    column: IMenucColumnData;
    isBig?: boolean;
  }>(),
  {
    isBig: false,
  }
);
</script>

<template>
  <div class="main-nav__column column" :class="{ 'column--big': isBig }">
    <router-link class="column__title-block" v-if="column.to" :to="column.to">
      <p class="column__title">{{ column.title }}</p>

      <div class="column__title-arrow">
        <TNIcon name="arrow-narrow-right" :size="16" />
      </div>
    </router-link>

    <a class="column__title-block" v-else-if="column.href" :href="column.href">
      <p class="column__title">{{ column.title }}</p>

      <div class="column__title-arrow">
        <TNIcon name="arrow-narrow-right" :size="16" />
      </div>
    </a>

    <div class="column__title-block" v-else>
      <p class="column__title">{{ column.title }}</p>

      <div class="column__title-arrow">
        <TNIcon name="arrow-narrow-right" :size="16" />
      </div>
    </div>

    <div class="column__items">
      <ColumnItem v-for="item in column.items" :key="item.title" :item="item" :is-big="isBig" />
    </div>
  </div>
</template>

<style lang="scss">
.column {
  display: flex;
  flex-direction: column;
  min-width: 303px;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &:not(:first-of-type) {
    border-left: 1px solid #e7e9ef;
  }

  .column__title-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    height: 72px;
    padding: 0 16px 0 31px;

    color: #2e384b;

    border-bottom: 1px solid #e7e9ef;
    transition: 300ms;
    cursor: pointer;

    &:hover {
      transition: 300ms;
      background-color: #f5f6fa;

      .column__title {
        color: #2e384b;
      }
    }
  }

  .column__title {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;

    color: #747c8c;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .column__title-arrow {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;

    background-color: #e7e9ef;

    border-radius: 5px;
  }

  .column__items {
    padding: 24px 16px 16px 16px;
  }
  
}

.column--big {
  .column__title-block {
    padding: 0 24px 0 24px;

    &:hover {
      background: none;

      .column__title {
        color: #2e384b;
      }
    }
  }
  .column__items {
    padding: 32px 24px 12px 24px;
  }

}
</style>
