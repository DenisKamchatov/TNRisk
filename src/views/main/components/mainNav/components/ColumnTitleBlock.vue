<script setup lang="ts">
const { columnTitle, columnTo, columnHref } = withDefaults(
  defineProps<{
    columnTitle: string;
    columnTo?: string;
    columnHref?: string;
    isBig?: boolean;
  }>(),
  {
    isBig: false,
  }
);
</script>

<template>
  <router-link class="column__title-block" :class="{ 'column__title-block_big': isBig }" v-if="columnTo" :to="columnTo">
    <p class="column__title">{{ columnTitle }}</p>

    <div class="column__title-arrow">
      <TNIcon name="arrow-narrow-right" :size="16" />
    </div>
  </router-link>

  <a class="column__title-block" :class="{ 'column__title-block_big': isBig }" v-else-if="columnHref" :href="columnHref">
    <p class="column__title">{{ columnTitle }}</p>

    <div class="column__title-arrow">
      <TNIcon name="arrow-narrow-right" :size="16" />
    </div>
  </a>

  <div class="column__title-block" :class="{ 'column__title-block_big': isBig }" v-else>
    <p class="column__title">{{ columnTitle }}</p>

    <div class="column__title-arrow">
      <TNIcon name="arrow-narrow-right" :size="16" />
    </div>
  </div>
</template>

<style lang="scss">
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
}

.column__title-block_big {
    padding: 0 24px 0 24px;

    &:hover {
      background: none;

      .column__title {
        color: #2e384b;
      }
    }
  }
</style>
