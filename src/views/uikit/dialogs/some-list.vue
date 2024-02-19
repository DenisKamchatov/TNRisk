<script setup lang="ts">
import { onMounted, ref } from "vue";
import TnDialog from "@/components/uikit/dialog/tn-dialog.vue";
import TnButton from "@/components/uikit/button/tn-button.vue";
import TnConfirm from "@/components/uikit/confirm/tn-confirm.vue";

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
  console.log("some-list: deleteElement", idx, confirmDialog.value);

  const result = await confirmDialog.value?.open();
  result && props.list.splice(idx, 1);
}

onMounted(() => {
  console.log("some-list: mounted");
});
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

    <TnButton primary @click="isDialogVisible = true"
      >Добавить покупку</TnButton
    >

    <TnDialog v-if="isDialogVisible" @close="isDialogVisible = false">
      <div v-for="i in 55" :key="i">Новая покупка</div>
    </TnDialog>

    <TnConfirm ref="confirmDialog">
      <template #header><strong>Вы точно уверены?</strong></template>
    </TnConfirm>
  </div>
</template>

<style lang="scss">
.some-list {
  /**/
}
</style>
