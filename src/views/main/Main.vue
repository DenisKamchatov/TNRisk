<script setup lang="ts">
import MainNav from './components/MainNav.vue';
</script>

<template>
  <div class="main">
    <MainNav :is-big="true" />
  </div>
</template>

<style lang="scss">
  .main {
    margin: 96px 0 0 0;
  }
</style>
