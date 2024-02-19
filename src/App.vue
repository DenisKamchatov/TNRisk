<script lang="ts" setup>
import { RouterView } from "vue-router";
import AppHeader from "./components/app-header.vue";
import MainNav from "./views/main/components/mainNav/MainNav.vue";
import MainFooter from "@/views/main/components/MainFooter.vue";
</script>

<template>
  <AppHeader>
    <template #menu>
      <MainNav>
        <template #footer>
          <MainFooter />
        </template>
      </MainNav>
    </template>
  </AppHeader>
  <router-view />
  <div class="app-modals"></div>
</template>

<style lang="scss"></style>
