<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Dropdown } from "floating-vue";
import TNIcon from "@/components/uikit/elements/icons/tn-icon.vue";

const modelValue = defineModel<string>({
  type: String,
  default: "ru",
});

const list = ref(["ru", "en"]);

defineEmits(["select"]);
</script>

<template>
  <div>

  </div>
  <Dropdown class="lang-select" :arrow-overflow="true">
    <button class="lang-select__toggler">
      <span class="lang-select__icon">
        <img :src="`/images/icons/flags/${modelValue}.svg`" :alt="`${modelValue}`" />
      </span>
      <span class="lang-select__text">{{ modelValue }}</span>
      <TNIcon name="chevron-down" />
    </button>
    <template #popper>
      <div class="lang-select__menu">
        <button
          class="lang-select__menu-item"
          :class="{ 'lang-select__menu-item_active': modelValue === item }"
          v-for="item in list"
          :key="item"
          @click="modelValue = item"
          v-close-popper
        >
          <span class="lang-select__icon">
            <img :src="`/images/icons/flags/${item}.svg`" :alt="`${item}`" />
          </span>
          <span class="lang-select__text">{{ item }}</span>
        </button>
      </div>
    </template>
  </Dropdown>
</template>

<style lang="scss">
.lang-select {
  /**/
}

.lang-select__toggler {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-radius: 12px;
}

.lang-select__icon {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 16px;

  img {
    display: block;
    width: 100%;
  }
}

.lang-select__text {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: var(--lang-select-text);
  text-transform: capitalize;
}

.lang-select__menu {
  display: flex;
  flex-direction: column;

  padding: 12px;
}

.lang-select__menu-item {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 14px 12px;

  &:hover,
  &:focus {
    background-color: var(--lang-select-item-bg);
    border-radius: 8px;
  }
}

.v-popper--theme-dropdown .v-popper__arrow-container {
  display: none;
}

.v-popper--theme-dropdown .v-popper__inner {
  border-radius: 16px;
}

</style>
