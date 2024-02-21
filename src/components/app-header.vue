<script setup lang="ts">
import { ref } from "vue";
import TNIcon from "./uikit/icons/tn-icon.vue";

const isOpenedMenu = ref<boolean>(false);
</script>

<template>
  <div class="app-header__cap" v-if="isOpenedMenu"></div>
  <header
    class="app-header container"
    :class="{ 'app-header_open-menu': isOpenedMenu }"
  >
    <div class="app-header__top">
      <div class="app-header__left-bar">
        <div class="app-header__icon-block">
          <TNIcon name="logotype" :size="24" />
          <h5 class="app-header__logo-title">Risk</h5>
        </div>

        <div
          class="app-header__menu-button menu-button"
          @click="isOpenedMenu = !isOpenedMenu"
        >
          <TNIcon :name="isOpenedMenu ? 'x' : 'menu'" :size="24" />
          <p class="menu-button__text">Меню</p>
        </div>
      </div>

      <!-- TODO: Добавить в header__right-bar кнопки -->
      <nav class="app-header__right-bar"></nav>
    </div>
    <slot name="menu" v-if="isOpenedMenu"></slot>

    <div
      v-if="isOpenedMenu"
      @click="isOpenedMenu = !isOpenedMenu"
      class="app-header__bg"
    ></div>

  </header>
</template>

<style lang="scss">
.app-header__cap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  width: 100%;
  height: 96px;

  background-color: rgb(245, 246, 250, 0.6);

  backdrop-filter: blur(5px);
}
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;

  background-color: rgb(245, 246, 250, 0.6);

  backdrop-filter: blur(5px);

  .app-header__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
    border-bottom: 1px solid #e7e9ef;
  }

  .app-header__left-bar {
    display: flex;
    align-items: center;
  }

  .app-header__icon-block {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px 27px 11px 20px;

    font-size: 19px;

    background-color: #fff;

    border-radius: 12px;

    .tn-icon {
      color: #ed1c24;
    }

    .app-header__logo-title {
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
    color: #2e384b;

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

.app-header_open-menu {
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 24px;
  left: 24px;
  right: 24px;
  width: -webkit-fill-available;
  margin: 0 0;
  padding: 0 0;
  max-height: 90vh;
  overflow-y: hidden;

  background-color: #fff;
  box-shadow: 0px 2px 8px 0px rgba(46, 56, 75, 0.08),
    0px 0px 1px 0px rgba(46, 56, 75, 0.24),
    0px 6px 58px 0px rgba(121, 145, 173, 0.19);

  border-radius: 24px;

  backdrop-filter: none;

  // &::-webkit-scrollbar {
  //   transform: translateX(40px);
  //   width: 18px;
  //   height: 18px;
  // }

  // &::-webkit-scrollbar-track {
  //   background: #fff;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background-color: #d6dee1;
  //   border-radius: 20px;
  //   border: 6px solid transparent;
  //   background-clip: content-box;
  // }

  // &::-webkit-scrollbar-thumb:hover {
  //   background-color: #a8bbbf;
  // }

  // &::-webkit-scrollbar-corner {
  //   background: none;
  // }

  .app-header__top {
    position: sticky;
    top: 0;
    left: 0;

    width: 100%;
    padding: 24px 32px;
    z-index: 100;

    background-color: #fff;

    backdrop-filter: blur(5px);
  }

  .app-header__icon-block {
    background-color: #f5f6fa;
  }

  .menu-button {
    background-color: #f5f6fa;

    .menu-button__text {
      color: #2e384b;
    }
  }

  .app-header__bg {
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
