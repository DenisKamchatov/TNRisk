<script setup lang="ts">
import { ref } from 'vue'
import TNIcon from "./uikit/icons/tn-icon.vue";
import MainNav from '@/views/main/components/mainNav/MainNav.vue';
import MainFooter from '@/views/main/components/MainFooter.vue';

const isOpenedMenu = ref<boolean>(false)
</script>

<template>
  <header class="header container" :class="{ 'header--open-menu': isOpenedMenu }">
    <div class="header__top">
      <div class="header__left-bar">
        <div class="header__icon-block">
          <TNIcon name="logotype" :size="24" />
          <h5 class="header__logo-title">Risk</h5>
        </div>

        <div class="header__menu-button menu-button" @click="isOpenedMenu = !isOpenedMenu">
          <TNIcon :name=" isOpenedMenu ? 'x' : 'menu'" :size="24" />
          <p class="menu-button__text">Меню</p>
        </div>
      </div>
      <!-- TODO: Добавить в header__right-bar кнопки -->
      <nav class="header__right-bar"></nav>
    </div>
    <div v-if="isOpenedMenu" @click="isOpenedMenu = !isOpenedMenu" class="header__bg"></div>
    <MainNav v-if="isOpenedMenu" :is-big="false">
      <template #footer>
        <MainFooter :is-big="false" />
      </template>
    </MainNav>
  </header>
</template>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;

  .header__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
    border-bottom: 1px solid #e7e9ef;
  }


  .header__left-bar {
    display: flex;
    align-items: center;
  }

  .header__icon-block {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px 27px 11px 20px;

    font-size: 19px;

    background-color: #fff;

    border-radius: 12px;

    .tn-icon {
      color: #ED1C24;
    }

    .header__logo-title {
      color: #242424;
      margin: 0 0 0 11.5px;
    }
  }

  .menu-button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px 16px 11px 16px;
    margin: 0 0 0 16px;

    font-size: 16px;

    background-color: #fff;
    color: #2E384B;

    border-radius: 12px;
    cursor: pointer;

    .tn-icon {
      font-size: 24px;
    }

    .menu-button__text {
      margin: 0 0 0 8px;

      font-size: 16px;
      font-weight: 600;
      line-height: 24px;

      color: #1d1e22;
    }
  }
}



.header--open-menu {
  top: 24px;
  left: 24px;
  right: 24px;
  width: -webkit-fill-available;
  margin: 0 0;

  background-color: #fff;
  box-shadow: 0px 2px 8px 0px rgba(46, 56, 75, 0.08), 0px 0px 1px 0px rgba(46, 56, 75, 0.24), 0px 6px 58px 0px rgba(121, 145, 173, 0.19);
  
  border-radius: 24px;
  overflow: hidden;

  .header__top {
    padding: 24px 32px;
    background-color: #fff;
  }

  .header__icon-block {
    background-color: #F5F6FA;
  }

  .menu-button {

    background-color: #F5F6FA;

    .menu-button__text {
      color: #2E384B;
    }
  }
  
  .header__bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;

    background-color: rgba(10, 61, 143, 0.18);
  }
}
</style>
