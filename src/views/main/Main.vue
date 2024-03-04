<script setup lang="ts">
import MainNav from "./components/mainNav/MainNav.vue";
import MainFooter from "@/views/main/components/MainFooter.vue";
import HomepageLayout from "@/layouts/homepage-layout/homepage-layout.vue";
</script>

<template>
  <div class="main">
    <HomepageLayout>
      <MainNav :is-big="true"></MainNav>
      <template #footer>
        <MainFooter :is-big="true" />
      </template>
    </HomepageLayout>
  </div>
</template>

<style lang="scss">
.main {
  height: 100vh;
}
</style>
