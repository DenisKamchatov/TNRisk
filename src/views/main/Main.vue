<script setup lang="ts">
import MainNav from "./components/mainNav/MainNav.vue";
import MainFooter from '@/views/main/components/MainFooter.vue';
import homepageLayout from "@/layouts/homepage-layout.vue";
</script>

<template>
  <div class="main">
    <homepage-layout>
      <MainNav :is-big="true"></MainNav>
      <template #footer>
        <MainFooter :is-big="true" />
      </template>
    </homepage-layout>
  </div>
</template>

<style lang="scss">
.main {
  height: 100vh;
}
</style>
