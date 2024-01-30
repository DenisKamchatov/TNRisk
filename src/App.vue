<script lang="ts" setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import MainNav from './views/main/components/mainNav/MainNav.vue';
</script>

<template>
  <div id="app">
    <Header>
      <template #menu>
        <MainNav :is-big="false">
          <template #footer>
            <MainFooter :is-big="false" />
          </template>
        </MainNav>
      </template>
    </Header>
    <router-view />
  </div>
</template>


<style lang="scss">

</style>
