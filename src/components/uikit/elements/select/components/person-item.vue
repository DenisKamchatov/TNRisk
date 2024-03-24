<script setup lang="ts">
import TnAvatar from "@/components/uikit/elements/avatar/tn-avatar.vue";

const props = withDefaults(defineProps<{
  image: string,
  label: string,
  email: string,
}>(), {

});
</script>

<template>
  <div class="uikit-select__item">
    <TnAvatar size="lg" :image="image" />
    <div class="uikit-select__item-text">
      <p class="uikit-select__item-label">{{ label }}</p>
      <p class="uikit-select__item-email">{{ email }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.uikit-select__item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.uikit-select__item-text {
  text-align: left;
}

.uikit-select__item-label {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  color: var(--select-dropdown-person-item-label);
}

.uikit-select__item-email {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;

  color: var(--select-dropdown-person-item-email);
}

</style>
