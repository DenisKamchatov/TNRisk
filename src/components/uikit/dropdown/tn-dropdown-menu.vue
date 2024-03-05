<script setup lang="ts">
import { onMounted } from "vue";
import { Menu } from "floating-vue";
import TnButton from "../button/tn-button.vue";

const props = withDefaults(
  defineProps<{
    icon?: string;
  }>(),
  {
    icon: "dots-vertical",
  }
);

defineEmits(["click"]);
</script>

<template>
  <Menu
    class="tn-dropdown-menu"
    :placement="`auto-start`"
    :auto-hide="false"
    :skidding="-12"
  >
    <slot>
      <TnButton
        class="tn-dropdown-menu__button"
        :icon="icon"
        is-icon
        secondary
        @click.stop
      />
    </slot>

    <template #popper>
      <div class="tn-dropdown-menu__list">
        <slot name="menu">
          <i>empty menu</i>
        </slot>
      </div>
    </template>
  </Menu>
</template>

<style lang="scss">
.tn-dropdown-menu {
  /**/
}

.tn-dropdown-menu__list {
  display: flex;
  flex-direction: column;
  min-width: 160px;

  padding: 12px;
}
</style>
