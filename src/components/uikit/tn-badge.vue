<script setup lang="ts">
import { useSlots, ref, computed } from "vue";

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
const slots = useSlots();
const slotValue = slots.default?.()[0].children || "";

const isOval = computed(() => {
  if (typeof slotValue === "string" && slotValue.length > 1) {
    return true;
  }

  return false;
});
</script>

<template>
  <div
    class="tn-badge"
    :class="{
      'tn-badge_sm': size === 'sm',
      'tn-badge_lg': size === 'lg',
      'tn-badge_default': classic ? false : defaultType,
      'tn-badge_classic': classic,
      'tn-badge_oval': isOval,
    }"
  >
    <slot>
      {{ badge }}
    </slot>
  </div>
</template>

<style lang="scss">
.tn-badge {
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
}

.tn-badge_sm {
  min-width: 16px;
  max-width: 16px;
  height: 16px;
}

.tn-badge_lg {
  min-width: 20px;
  max-width: 20px;
  height: 20px;
}

.tn-badge_default {
  min-width: 16px;
  max-width: 16px;
  height: 16px;

  font-size: 12px;
  font-weight: 500;

  color: #747c8c;
  background-color: #e7e9ef;

  border-radius: 4px;
}

.tn-badge_classic {
  font-size: 12px;
  font-weight: 600;

  color: #fff;
  background-color: #eb3b41;
}

.tn-badge_oval {
  max-width: none;
  min-width: none;
  border-radius: 10px;
}

.tn-badge_oval.tn-badge_lg {
  padding: 0 8px;
}

.tn-badge_oval.tn-badge_sm {
  padding: 0 6px;
}
</style>
