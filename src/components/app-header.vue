<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'
import TNIcon from "./uikit/icons/tn-icon.vue";
import HomepageButton from "@/layouts/homepage-layout/components/homepage-button/homepage-button.vue";
import HomepageNotification from "@/layouts/homepage-layout/components/homepage-notification/homepage-notification.vue";
import HomepageNavFirst from "@/layouts/homepage-layout/components/homepage-nav-first/homepage-nav-first.vue";
import TnAvatar from "@/components/uikit/avatar/tn-avatar.vue";
import NotificationsWidget from "@/components/widgets/notifications/notifications-widget.vue";

import { IHomepageNavFirst } from "@/layouts/homepage-layout/components/homepage-nav-first/typings";
import LangSelect from "./widgets/lang-select/lang-select.vue";

import { useLocalStorage } from "@vueuse/core";

const router = useRouter();
const isOpenedMenu = ref<boolean>(false);

// TODO: Подумать как передавать данные об меню в header (мб перенести header из App в layout)
const currentNavFirstOptionUrl = ref<string>('MainPage');

const language = useLocalStorage("risk.lang", "ru");

let navFirstOptions = ref<IHomepageNavFirst[]>([
  {
    id: 1,
    name: "uikit",
    urlName: "UikitPage",
  },
  {
    id: 2,
    name: "uikit-dialog",
    urlName: "UikitDialogPage",
  },
  {
    id: 3,
    name: "Label 3",
    urlName: "MainPage",
    disabled: true,
  },
]);
</script>

<template>
  <div class="app-header__cap" v-if="isOpenedMenu"></div>
  <header
    class="app-header container"
    :class="{ 'app-header_open-menu': isOpenedMenu }"
  >
    <div class="app-header__top">
      <div class="app-header__left-bar">
        <HomepageButton logo @click="router.push({ path: '/' })" />

        <HomepageButton
          class="app-header__menu-button"
          @click="isOpenedMenu = !isOpenedMenu"
          :icon="isOpenedMenu ? 'x' : 'menu'"
          >Меню</HomepageButton
        >

        <HomepageNavFirst
          class="app-header__nav-first"
          v-model="currentNavFirstOptionUrl"
          :options="navFirstOptions"
        />
      </div>

      <nav class="app-header__right-bar">
        <LangSelect v-model="language" />
        <NotificationsWidget />
        <!-- <HomepageButton icon="bell" :light="!isOpenedMenu"></HomepageButton> -->

        <HomepageButton :light="!isOpenedMenu">
          <div class="homepage-profile">
            <TnAvatar size="md" image="https://i.pinimg.com/originals/84/01/13/84011369742c4581e76047ec420733f2.jpg" />

            <div class="homepage-profile__text-block">
              <p class="homepage-profile__name">Егоренко А.</p>
              <p class="homepage-profile__role">Контролер</p>
            </div>

            <TNIcon class="homepage-profile__icon" name="chevron-down" :size="16" />
          </div>
        </HomepageButton>
      </nav>
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
    flex-wrap: wrap;
    gap: 16px;
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

  .app-header__menu-button {
    margin: 0 0 0 16px;
  }

  .app-header__nav-first {
    margin: 0 0 0 20px;
  }

  .app-header__right-bar {
    display: flex;
    align-items: center;
    gap: 16px;
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
