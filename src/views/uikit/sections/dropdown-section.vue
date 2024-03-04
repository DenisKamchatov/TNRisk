<script setup lang="ts">
import { onMounted, ref } from "vue";
import TnButton from "@/components/uikit/button/tn-button.vue";
import LangSelect from "@/layouts/homepage-layout/components/lang-select/lang-select.vue";

onMounted(() => {});

const language = ref("ru");
</script>

<template>
  <div class="uikit-section">
    <h2 class="uikit-section__title">Tooltips</h2>
    <div class="uikit-section__items">
      <TnButton primary v-tooltip.top="`Tooltip top`">Tooltip top</TnButton>
      <TnButton primary v-tooltip.bottom="`Tooltip bottom`">Tooltip bottom</TnButton>
      <TnButton primary v-tooltip.left="`Tooltip left`">Tooltip left</TnButton>
      <TnButton primary v-tooltip.right="`Tooltip right`">Tooltip right</TnButton>
    </div>
  </div>
  <div class="uikit-section">
    <h2 class="uikit-section__title">Language select</h2>
    <div class="uikit-section__items">
      <LangSelect v-model="language" />
    </div>
  </div>
</template>

<style lang="scss">
</style>
