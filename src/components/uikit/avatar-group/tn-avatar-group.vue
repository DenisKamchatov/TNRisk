<script setup lang="ts">
import { useSlots } from "vue";
import TnAvatar from "@/components/uikit/avatar/tn-avatar.vue";

const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    avatars?: any[];
    maxLength?: number;
    square?: boolean;
  }>(),
  {
    size: "md",
    avatars: 0,
    maxLength: 3,
    square: false,
  }
);
</script>

<template>
  <div class="avatar-group">
    <!-- <slot></slot> -->
    <TnAvatar
      v-for="(avatar, index) in avatars.slice(0, maxLength)"
      :key="index"
      :image="avatar?.image || undefined"
      :icon="avatar?.icon || undefined"
      :alt="avatar?.alt || undefined"
      :text="avatar?.text || undefined"
      :size="size"
      :square="square"
      :style="{
        transform: `translateX(-${index*8}px)`,
      }"
    />
    <TnAvatar
      v-if="avatars.length > maxLength"
      :size="size"
      :text="`+${avatars.length - maxLength}`"
      collapsed
      :style="{
        transform: `translateX(-${(maxLength) * 8}px)`,
      }"
    />
  </div>
</template>

<style lang="scss">
.avatar-group {
  display: flex;
  align-items: center;
  position: relative;

//   & > div:nth-child(2) {
//     transform: translateX(-8px);
//   }

//   & > div:nth-child(3) {
//     transform: translateX(-16px);
//   }

//   & > div:nth-child(4) {
//     transform: translateX(-24px);
//   }
}
</style>
