<script setup lang="ts">
import { IMenucColumnData } from "../../../typings/menuData.ts";
import TNIcon from "../../../components/uikit/icons/tn-icon.vue";
import MainFooter from "./MainFooter.vue";

const { isBig } = withDefaults(
  defineProps<{
    isBig?: boolean;
  }>(),
  {
    isBig: true,
  }
);

const menu: IMenucColumnData[] = [
  {
    title: "Внутренний контроль",
    // href: '',
    // to: '',
    items: [
      {
        title: "Актуализация",
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
      {
        title: "Оценка",
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
      {
        title: "Управление",
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
    ],
  },
  {
    title: "Внутренний аудит",
    // href: '',
    // to: '',
    items: [
      {
        title: "Планирование",
        // subtitle: '',
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
      {
        title: "Аудиты и расследования",
        // subtitle: '',
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
      {
        title: "Анкетирование",
        // subtitle: '',
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
    ],
  },
  {
    title: "Непрерывный мониторинг",
    // href: '',
    // to: '',
    items: [
      {
        title: "Мониторинг",
        // subtitle: '',
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
      {
        title: "Отчеты СВК",
        subtitle: "Система внутреннего контроля",
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
      {
        title: "Отчеты ДВА",
        subtitle: "Департамент внутреннего аудита",
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
    ],
  },
  {
    title: "Управление изменениями",
    href: "https://ya.ru/",
    // to: '',
    items: [
      {
        title:
          "Зоны развития Зоны развития Зоны развития Зоны развития Зоны развития Зоны развития",
        // subtitle: '',
        href: "yandex.ru",
        // to: '',
        icon: "menu",
        badge: "2",
      },
      {
        title: "Задачи",
        // subtitle: '',
        // href: '',
        // to: '',
        // icon: '',
        badge: "0",
      },
    ],
  },
  {
    title: "Внешние системы",
    // href: '',
    // to: '',
    items: [
      {
        title: "Охрана труда",
        // subtitle: '',
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
      {
        title: "ТОиР",
        subtitle: "Техническое обслуживание и ремонт",
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
      {
        title: "ОПС",
        subtitle: "Оценка производственной системы",
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
      {
        title: "Комитет ВК",
        subtitle: "Комитет внутреннего контроля",
        // href: '',
        // to: '',
        // icon: '',
        // badge: '',
      },
    ],
  },
];
</script>

<template>
  <div class="main-nav" :class="{ 'main-nav--big': isBig }">
    <div
      class="main-nav__column column"
      v-for="column in menu"
      :key="column.title"
    >
      <router-link class="column__title-block" v-if="column.to" :to="column.to">
        <p class="column__title">{{ column.title }}</p>

        <div class="column__title-arrow">
          <TNIcon name="arrow-narrow-right" :size="16" />
        </div>
      </router-link>

      <a
        class="column__title-block"
        v-else-if="column.href"
        :href="column.href"
      >
        <p class="column__title">{{ column.title }}</p>

        <div class="column__title-arrow">
          <TNIcon name="arrow-narrow-right" :size="16" />
        </div>
      </a>

      <div class="column__title-block" v-else>
        <p class="column__title">{{ column.title }}</p>

        <div class="column__title-arrow">
          <TNIcon name="arrow-narrow-right" :size="16" />
        </div>
      </div>

      <div class="column__items">
        <div
          class="column__item"
          v-for="item in column.items"
          :key="item.title"
        >
          <router-link
            v-if="item.to"
            class="column__item-wrapper"
            :to="item.to"
          >
            <div class="column__item-icon" v-if="item.icon">
              <TNIcon :name="item.icon" :size="24" />
            </div>
            <div class="column__item-text">
              <p class="column__item-title">{{ item.title }}</p>
              <p v-if="isBig" class="column__item-subtitle">
                {{ item.subtitle }}
              </p>
            </div>

            <div v-if="item.badge && +item.badge" class="column__item-badge">
              {{ item.badge }}
            </div>
          </router-link>

          <a
            class="column__item-wrapper"
            v-else-if="item.href"
            :href="item.href"
          >
            <div class="column__item-icon" v-if="item.icon">
              <TNIcon :name="item.icon" :size="24" />
            </div>
            <div class="column__item-text">
              <p class="column__item-title">{{ item.title }}</p>
              <p v-if="isBig" class="column__item-subtitle">
                {{ item.subtitle }}
              </p>
            </div>

            <div v-if="item.badge && +item.badge" class="column__item-badge">
              {{ item.badge }}
            </div>
          </a>

          <div class="column__item-wrapper" v-else>
            <div class="column__item-icon" v-if="item.icon">
              <TNIcon :name="item.icon" :size="24" />
            </div>
            <div class="column__item-text">
              <p class="column__item-title">{{ item.title }}</p>
              <p v-if="isBig" class="column__item-subtitle">
                {{ item.subtitle }}
              </p>
            </div>

            <div v-if="item.badge && +item.badge" class="column__item-badge">
              {{ item.badge }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MainFooter :is-big="isBig" />
</template>

<style lang="scss">
.main-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(303px, 1fr));
  grid-auto-flow: column;
  overflow: scroll;

  background-color: #fff;

  .column {
    display: flex;
    flex-direction: column;
    min-width: 303px;
    // max-width: 303px;

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &:not(:first-of-type) {
      border-left: 1px solid #e7e9ef;
    }

    .column__title-block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      height: 72px;
      padding: 0 16px 0 31px;

      color: #2e384b;

      border-bottom: 1px solid #e7e9ef;
      transition: 300ms;
      cursor: pointer;

      &:hover {
        transition: 300ms;
        background-color: #f5f6fa;

        .column__title {
          color: #2e384b;
        }
      }
    }

    .column__title {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;

      color: #747c8c;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .column__title-arrow {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 30px;
      height: 30px;

      background-color: #e7e9ef;

      border-radius: 5px;
    }

    .column__items {
      padding: 24px 16px 16px 16px;
    }
    .column__item {
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
      min-height: 48px;

      padding: 12px 24px 12px 16px;

      font-size: 24px;

      border-radius: 12px;
      transition: 300ms;
      cursor: pointer;

      &:hover {
        background-color: #f5f6fa;

        transition: 300ms;
      }

      &:not(:first-of-type) {
        margin: 8px 0 0 0;
      }

      .column__item-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;

        color: #2e384b;
      }

      .column__item-icon {
        min-width: 24px;
        max-width: 24px;
      }

      .column__item-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .column__item-title {
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;

        color: #2e384b;
      }

      .column__item-subtitle {
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;

        color: #747c8c;
      }

      .column__item-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        justify-self: end;

        min-width: 20px;
        max-width: 20px;
        height: 20px;

        font-size: 12px;
        font-weight: 600;
        line-height: 20px;

        color: #fff;
        background-color: #eb3b41;

        border-radius: 50%;
      }
    }
  }
}

.main-nav--big {
  background: none;

  .column {
    .column__title-block {
      padding: 0 24px 0 24px;

      &:hover {
        background: none;

        .column__title {
          color: #2e384b;
        }
      }
    }
    .column__items {
      padding: 32px 24px 12px 24px;
    }

    .column__item {
      min-height: 80px;
      padding: 12px 16px;

      background-color: #fff;

      border-radius: 12px;

      &:hover {
        background-color: #fff;
        box-shadow: 0px 2px 8px 0px rgba(46, 56, 75, 0.08),
          0px 0px 1px 0px rgba(46, 56, 75, 0.24),
          0px 6px 58px 0px rgba(121, 145, 173, 0.19);
      }
    }
  }
}
</style>
