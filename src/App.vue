<script lang="ts" setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import MainNav from './views/main/components/mainNav/MainNav.vue';
import MainFooter from '@/views/main/components/MainFooter.vue';

</script>

<template>
  <div id="app">
    <Header>
      <template #menu>
        <MainNav>
          <template #footer>
            <MainFooter />
          </template>
        </MainNav>
      </template>
    </Header>
    <router-view />
  </div>
</template>


<style lang="scss">

</style>
