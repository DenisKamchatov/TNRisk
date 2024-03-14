<script setup lang="ts">
import { ref, computed } from "vue";
import TnDialog from "@/components/uikit/elements/dialog/tn-dialog.vue";
import TnDialogBody from "@/components/uikit/elements/dialog/tn-dialog-body.vue";
import TnDialogBodyDouble from "@/components/uikit/elements/dialog/tn-dialog-body-double.vue";
import TnDialogHeader from "@/components/uikit/elements/dialog/tn-dialog-header.vue";
import TnDialogHeaderDouble from "@/components/uikit/elements/dialog/tn-dialog-header-double.vue";
import SomeList from "./some-list.vue";
import TnButton from "@/components/uikit/elements/button/tn-button.vue";
import TnInput from "@/components/uikit/elements/input/tn-input.vue";

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
          <template #header>
            <TnDialogHeader
              title="Доступ"
              description="Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов"
            >
              <p>Some default slot</p>
            </TnDialogHeader>
          </template>
          <TnDialogBody>
            <SomeList :list="list"></SomeList>
          </TnDialogBody>
        </TnDialog>
      </div>

      <div class="uikit-page__block-items">
        <TnButton primary @click="isDialogSecondVisible = true"
          >Открыть диалог</TnButton
        >

        <TnDialog
          v-if="isDialogSecondVisible"
          @close="isDialogSecondVisible = false"
        >
          <template #header>
            <TnDialogHeaderDouble
              title="Text"
              second-title="Text 2"
              description="First description"
              second-description="Second description"
            >
              <template #buttons>
                <TnButton secondary icon="dots-vertical" is-icon />
              </template>
              <template #buttonsRight>
                <TnButton secondary icon="dots-vertical" is-icon />
              </template>

              <template #body> First Body </template>
              <template #secondBody> Second Body </template>
            </TnDialogHeaderDouble>
          </template>

          <TnDialogBodyDouble>
            <template #header>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 16px;
                "
              >
                <TnInput placeholder="Поиск" icon="search" />
                <TnButton secondary icon-right="plus" size="lg"
                  >Добавить</TnButton
                >
              </div>
            </template>

            <template #body>
              <ul>
                <li v-for="i in 55" :key="i">{{ "Услуга " + i }}</li>
              </ul>
            </template>

            <template #secondBody>
              <ul>
                <li v-for="i in 20" :key="i">{{ "Услуга " + i }}</li>
              </ul>
            </template>
          </TnDialogBodyDouble>
          <template #footer>
            <TnButton secondary>Отменить</TnButton>
            <TnButton>Сохранить</TnButton>
          </template>
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

  padding: 130px 96px 240px 96px;
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
