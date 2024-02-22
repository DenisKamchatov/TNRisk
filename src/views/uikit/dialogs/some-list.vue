<script setup lang="ts">
import { ref } from "vue";
import TnDialog from "@/components/uikit/dialog/tn-dialog.vue";
import TnButton from "@/components/uikit/button/tn-button.vue";
import TnConfirm from "@/components/uikit/confirm/tn-confirm.vue";
import TnDialogHeader from "@/components/uikit/dialog/tn-dialog-header.vue";
import TnDialogBody from "@/components/uikit/dialog/tn-dialog-body.vue";

const props = withDefaults(
  defineProps<{
    list: string[];
  }>(),
  {}
);

const currentItemIndex = ref(0);
const isDialogVisible = ref(false);

const confirmDialog = ref<any>(null);

async function deleteElement(idx: number) {
  const result = await confirmDialog.value?.open();
  result && props.list.splice(idx, 1);
}
</script>

<template>
  <div class="some-list">
    <h3>Мой список покупок</h3>
    <ul>
      <li
        v-for="(item, itemIndex) in list"
        :key="item"
        @click="currentItemIndex = itemIndex"
      >
        {{ item }}
        <TnButton primary @click="deleteElement(itemIndex)">Delete</TnButton>
      </li>
    </ul>

    <TnButton block primary @click="isDialogVisible = true"
      >Добавить покупку</TnButton
    >

    <TnDialog
      v-if="isDialogVisible"
      @close="isDialogVisible = false"
      :overflow="false"
      title="Новая покупка 123456"
    >
      <TnDialogBody>
        <template #header>hhhhhhhhhh</template>
        <div v-for="i in 55" :key="i">Новая покупка {{ i }}</div>
      </TnDialogBody>
      <template #footer>List Footer</template>
    </TnDialog>

    <TnConfirm ref="confirmDialog">
    </TnConfirm>
  </div>
</template>

<style lang="scss">
.some-list {
  ul > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
</style>
