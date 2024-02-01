<script setup lang="ts">
import { useSlots, ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    badge?: string | number;
    defaultType?: boolean;
    classic?: boolean;
    size?: "sm" | "lg";
  }>(),
  {
    badge: 0,
    defaultType: true,
    classic: false,
    size: "sm",
  }
);
const slots = useSlots()
const slotValue = slots.default?.()[0].children || ''

const isOval = computed(() => {
  return !!(slotValue && Number(slotValue) && slotValue.split('').length > 1)
})
</script>

<template>
  <div
    class="badge"
    :class="{
      badge_sm: size === 'sm',
      badge_lg: size === 'lg',
      badge_default: classic ? false : defaultType,
      badge_classic: classic,
      badge_oval: isOval
    }"
  >
    <slot>
      {{ badge }}
    </slot>
  </div>
</template>

<style lang="scss">
.badge {
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
}

.badge_sm {
  min-width: 16px;
  max-width: 16px;
  height: 16px;
}
.badge_lg {
  min-width: 20px;
  max-width: 20px;
  height: 20px;
}
.badge_default {
  min-width: 16px;
  max-width: 16px;
  height: 16px;

  font-size: 12px;
  font-weight: 500;

  color: #747c8c;
  background-color: #e7e9ef;

  border-radius: 4px;
}
.badge_classic {
  font-size: 12px;
  font-weight: 600;

  color: #fff;
  background-color: #eb3b41;
}
.badge_oval {
  max-width: none;
  min-width: none;
  border-radius: 10px;

}
.badge_oval.badge_lg {
  padding: 0 8px;
}
.badge_oval.badge_sm {
  padding: 0 6px;
}
</style>
