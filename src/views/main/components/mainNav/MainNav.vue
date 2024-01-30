<script setup lang="ts">
import { IMenucColumnData } from "../../../typings/menuData.ts";
import TNIcon from "../../../components/uikit/icons/tn-icon.vue";
import MainFooter from "./MainFooter.vue";
import Column from "./components/Column.vue";

const { isBig } = withDefaults(
  defineProps<{
    isBig?: boolean;
  }>(),
  {
    isBig: false,
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
    <Column
      v-for="column in menu"
      :key="column.title"
      :column="column"
      :is-big="isBig"
    />
  </div>
  <slot name="footer"></slot>
</template>

<style lang="scss">
.main-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(303px, 1fr));
  grid-auto-flow: column;
  overflow: scroll;

  background-color: #fff;

  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
}

.main-nav--big {
  background: none;
}
</style>
