<script setup lang="ts">
import MainNav from './components/mainNav/MainNav.vue';
import MainFooter from './components/MainFooter.vue';
</script>

<template>
  <div class="main">
    <MainNav :is-big="true">
      <template #footer>
        <MainFooter :is-big="true" />
      </template>
    </MainNav>
  </div>
</template>

<style lang="scss">
  .main {
    margin: 96px 0 0 0;
  }
</style>
