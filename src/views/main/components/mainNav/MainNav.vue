<script setup lang="ts">
import { IMenucColumnData } from "./typings";
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
    items: [
      {
        title: "Актуализация",
      },
      {
        title: "Оценка",
      },
      {
        title: "Управление",
      },
    ],
  },
  {
    title: "Внутренний аудит",
    items: [
      {
        title: "Планирование",
      },
      {
        title: "Аудиты и расследования",
      },
      {
        title: "Анкетирование",
      },
    ],
  },
  {
    title: "Непрерывный мониторинг",
    items: [
      {
        title: "Мониторинг",
      },
      {
        title: "Отчеты СВК",
        subtitle: "Система внутреннего контроля",
      },
      {
        title: "Отчеты ДВА",
        subtitle: "Департамент внутреннего аудита",
      },
    ],
  },
  {
    title: "Управление изменениями",
    href: "https://ya.ru/",
    items: [
      {
        title: "Зоны развития Зоны развития Зоны развития Зоны развития",
        href: "yandex.ru",
        icon: "menu",
        badge: "2",
      },
      {
        title: "Задачи",
        badge: "0",
      },
    ],
  },
  {
    title: "Внешние системы",
    items: [
      {
        title: "Охрана труда",
      },
      {
        title: "ТОиР",
        subtitle: "Техническое обслуживание и ремонт",
      },
      // {
      //   title: "ОПС",
      //   subtitle: "Оценка производственной системы",
      // },
      // {
      //   title: "Комитет ВК",
      //   subtitle: "Комитет внутреннего контроля",
      // },
      // {
      //   title: "ТОиР",
      //   subtitle: "Техническое обслуживание и ремонт",
      // },
      // {
      //   title: "ОПС",
      //   subtitle: "Оценка производственной системы",
      // },
      // {
      //   title: "Комитет ВК",
      //   subtitle: "Комитет внутреннего контроля",
      // },
      {
        title: "ОПС",
        subtitle: "Оценка производственной системы",
      },
      {
        title: "Комитет ВК",
        subtitle: "Комитет внутреннего контроля",
      },
      {
        title: "ТОиР",
        subtitle: "Техническое обслуживание и ремонт",
      },
      {
        title: "ОПС",
        subtitle: "Оценка производственной системы",
      },
      {
        title: "Комитет ВК",
        subtitle: "Комитет внутреннего контроля",
      },
    ],
  },
];
</script>

<template>
  <div class="main-nav scrollbox" :class="{ 'main-nav_big': isBig }">
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

  height: inherit;

  background-color: #fff;
}

.main-nav_big {
  background: none;
}
</style>
