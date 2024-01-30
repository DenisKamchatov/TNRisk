<script setup lang="ts">
import { IMenucColumnData } from "../../../typings/menuData.ts";
import ColumnItem from "./ColumnItem.vue";
import ColumnTitleBlock from "./ColumnTitleBlock.vue";

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
    <ColumnTitleBlock 
      :column-title="column.title"
      :column-to="column.to"
      :column-href="column.href"
      :is-big="isBig"
    />

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

  .column__items {
    padding: 24px 16px 16px 16px;
  }
  
}

.column--big {
  .column__items {
    padding: 32px 24px 12px 24px;
  }

}
</style>
