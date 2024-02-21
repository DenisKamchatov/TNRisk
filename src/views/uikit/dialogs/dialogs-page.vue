<script setup lang="ts">
import { ref } from "vue";
import TnDialog from "@/components/uikit/dialog/tn-dialog.vue";
import TnDialogHeader from "@/components/uikit/dialog/tn-dialog-header.vue";
import TnDialogHeaderDouble from "@/components/uikit/dialog/tn-dialog-header-double.vue";
import SomeList from "./some-list.vue";
import TnButton from "@/components/uikit/button/tn-button.vue";

const props = withDefaults(
  defineProps<{
    item: any;
  }>(),
  {
    item: null,
  }
);

const list = ref(["1", "2", "3"]);
const isDialogVisible = ref(false);
const isDialogSecondVisible = ref(false);
</script>

<template>
  <div class="uikit-page dialogs-page">
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Dialogs</h2>
      <div class="uikit-page__block-items">
        <TnButton primary @click="isDialogVisible = true"
          >Открыть диалог</TnButton
        >

        <TnDialog v-if="isDialogVisible" @close="isDialogVisible = false">
          <TnDialogHeader title="Text"></TnDialogHeader>
          <SomeList :list="list"></SomeList>
        </TnDialog>
      </div>

      <div class="uikit-page__block-items">
        <TnButton primary @click="isDialogSecondVisible = true"
          >Открыть диалог</TnButton
        >

        <TnDialog v-if="isDialogSecondVisible" @close="isDialogSecondVisible = false">
          <TnDialogHeaderDouble title="Text" second-title="Text 2">
            <template #buttons>
              <TnButton secondary icon="dots-vertical" is-icon />
            </template>
            <template #buttonsRight>
              <TnButton secondary icon="dots-vertical" is-icon />
            </template>
          </TnDialogHeaderDouble>
          <SomeList :list="list"></SomeList>
        </TnDialog>
      </div>


    </div>
  </div>
</template>

<style lang="scss">
.uikit-page {
  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 130px 96px 96px 96px;
  margin: 0 auto;

  background-color: #fff;

  .uikit-page__block {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .uikit-page__block-title {
    margin: 0 0 10px 0;
  }
  .uikit-page__block-items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .uikit-page__block-items_column {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
}
</style>
