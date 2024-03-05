<script setup lang="ts">
import { onMounted, provide } from "vue";
import { Menu, Placement } from "floating-vue";
import TnButton from "../button/tn-button.vue";
import { DropdownItemRegisterKey, DropdownItemUnregisterKey, type IDropdownItemData } from "./typings";

const props = withDefaults(
  defineProps<{
    icon?: string;
    placement?: Placement;
    nested?: boolean;
  }>(),
  {
    icon: "dots-vertical",
    placement: "auto-start",
    nested: false,
  }
);

defineEmits(["click"]);

const childs = new Map<symbol, IDropdownItemData>();

function registerChild(data: IDropdownItemData) {
  childs.set(data.id, data);
}

function unregisterChild(id: symbol) {
  childs.delete(id);
}

provide(DropdownItemRegisterKey, registerChild);
provide(DropdownItemUnregisterKey, unregisterChild);
</script>

<template>
  <Menu
    class="tn-dropdown-menu"
    :placement="placement"
    :auto-hide="false"
    :skidding="nested ? -12 : 0"
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
