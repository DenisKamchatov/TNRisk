<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from 'vue-router'
import TNIcon from "./uikit/elements/icons/tn-icon.vue";
import HomepageButton from "@/layouts/homepage-layout/components/header-button/header-button.vue";
import HomepageNavFirst from "@/layouts/homepage-layout/components/header-nav-first/header-nav-first.vue";
import TnAvatar from "@/components/uikit/elements/avatar/tn-avatar.vue";
import NotificationsWidget from "@/components/widgets/notifications/notifications-widget.vue";

import { IHomepageNavFirst } from "@/layouts/homepage-layout/components/header-nav-first/typings";
import LangSelect from "./widgets/lang-select/lang-select.vue";
import TnSearch from "@/components/uikit/elements/search/tn-search.vue";

import { useLocalStorage } from "@vueuse/core";

interface ISearchValue {
  id: string;
  title: string;
  urlName: string;
}

const router = useRouter();
const isOpenedMenu = ref<boolean>(false);
const loading = ref<boolean>(false)
const searchValue = ref<string>('');
const searchResult = ref<ISearchValue[]>([
  {
    id: "1",
    title: "Страница Uikit",
    urlName: 'UikitPage'
  },
  {
    id: "2",
    title: "Перейти на страницу Uikit Dialog",
    urlName: 'UikitDialogPage'
  },
  {
    id: "3",
    title:
      "Главная страница",
      urlName: 'MainPage'
  },
  // {
  //   id: "4",
  //   title: "Эксперты утверждают, что частотность поисковых запросов бодрит",
  //   urlName: ''
  // },
]);

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

const currentSearchResult = ref<ISearchValue[]>([])

const performSearch = async (): Promise<ISearchValue[]> => {
  loading.value = true
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(searchResult.value.filter((item) => item.title.toLowerCase().includes(searchValue.value.toLowerCase())))
    }, 1000);
  });
};

watch(searchValue, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    try {
      const results = await performSearch();
      loading.value = false

      currentSearchResult.value = results;
    } catch (error) {
      console.log('Ошибка поиска:', error);
    }
  }
});

const selectSearchValue = (value: string) => {
  if (currentSearchResult.value) {
    return router.push({ name: currentSearchResult.value.find((item) => item.title === value)?.urlName })
  }

  return;
}
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
          :options="navFirstOptions"
        />
      </div>

      <nav class="app-header__right-bar">
        <LangSelect v-model="language" />

        <TnSearch
          v-if="!isOpenedMenu"
          v-model="searchValue"
          :result="currentSearchResult"
          show-result
          :loading="loading"
          search-hint="Введите что-нибудь для поиска"
          nothing-found-title="Я ничего не нашёл"
          @select="selectSearchValue"
        />

        <NotificationsWidget />

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
@/layouts/homepage-layout/components/header-nav-first/typings
