<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { Dropdown } from "floating-vue";
import TnDialogHeader from "@/components/uikit/elements/dialog/tn-dialog-header.vue";
import TnDialogBody from "@/components/uikit/elements/dialog/tn-dialog-body.vue";
import TnTabs from "@/components/uikit/elements/tabs/tn-tabs.vue";
import { TNTabsOption } from "@/components/uikit/elements/tabs/typings";
import NotificationsItem from "./notifications-item.vue";

const currentTab = ref(1);

const tabs: TNTabsOption[] = [
  {
    id: 1,
    name: "Уведомления",
  },
  {
    id: 2,
    name: "Действия",
  }
];

const data = reactive({
  notifications: [
    {
      id: 1,
      title: "Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
      unread: true,
      link: "https://pinia.vuejs.org/",
    },
    {
      id: 2,
      title: "Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
      unread: true,
      link: "https://vuejs.org/",
    },
    {
      id: 3,
      title: "Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
      unread: true,
    },
    {
      id: 4,
      title: "Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
      unread: true,
    },
    {
      id: 5,
      title: "Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
      unread: true,
    },
    {
      id: 6,
      title: "Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
      unread: true,
    },
    {
      id: 7,
      title: "Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
    },
    {
      id: 8,
      title: "Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
    },
  ],
  actions: [
    {
      id: 1,
      title: "actions Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
      unread: true,
    },
    {
      id: 2,
      title: "actions Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
      link: "https://pinia.vuejs.org/",
    },
    {
      id: 3,
      title: "actions Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
      unread: true,
    },
    {
      id: 4,
      title: "actions Запрос на согласование",
      text: "Аудит: Перевод документов Аудит: Перевод документов Аудит: Перевод документов",
    },
  ],
});


const hasNotifications = computed(() => {
  return data.notifications.some((item) => item.unread) || data.actions.some((item) => item.unread);
});

const itemsOutput = computed(() => {
  if (currentTab.value === 1) {
    return data.notifications;
  } else if (currentTab.value === 2) {
    return data.actions;
  } else {
    return [];
  }
});

</script>

<template>
  <Dropdown class="notifications-widget" theme="notifications">
    <button
      class="notifications-widget__button"
      :class="{
        'notifications-widget_has-notification': hasNotifications
      }"
    >
      <span
        class="notifications-widget__icon"
      >
        <TNIcon :size="20" :name="hasNotifications ? 'bell-ringing' : 'bell'" />
      </span>

      <div class="notifications-widget__point" v-if="hasNotifications"></div>
    </button>

    <template #popper>
      <div class="notifications-widget__menu">
        <TnDialogHeader title="Уведомления" closeable></TnDialogHeader>
        <TnDialogBody>
          <template #header>
            <TnTabs :options="tabs" v-model="currentTab" />
          </template>
          <div class="notifications-widget__list" v-auto-animate>
            <NotificationsItem
              v-for="(item, idx) in itemsOutput"
              :key="`nw-item-${item.title}-${item.id}`"
              :title="`${item.id} ${item.title}`"
              :text="item.text"
              :unread="item.unread"
              :href="item.link || ''"
              @read="item.unread = false"
              @remove="itemsOutput.splice(idx, 1)"
            ></NotificationsItem>

            <div
              class="notifications-widget__empty"
              v-if="itemsOutput.length === 0"
            >
              У вас нет новых уведомлений
            </div>
          </div>
        </TnDialogBody>
      </div>
    </template>
  </Dropdown>
</template>

<style lang="scss">
.notifications-widget__button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;

  height: 48px;
  width: 48px;
  padding: 12px 16px;

  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  border: 1px solid transparent;
  outline: 2px solid transparent;
  background: var(--notifications-widget-bg);
  color: var(--notifications-widget-color);
  user-select: none;

  transition: 300ms;

  &:hover:enabled {
    border: var(--notifications-widget-border-hover);

    transition: 300ms;
  }

  &:focus:enabled {
    border: var(--notifications-widget-border-focus);
    outline: var(--notifications-widget-outline-focus);
    transition: 300ms;
  }
}

.notifications-widget__point {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 4px;
  height: 4px;

  border-radius: 50%;

  background-color: var(--notifications-widget-point-bg);
}

.notifications-widget__icon {
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  font-size: 24px;

  color: #2E384B;

  svg {
    pointer-events: none;
  }
}

.notifications-widget__menu {
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  width: 464px;
  height: 85vh;

  .tn-dialog-body__header {
    padding-top: 0;
    padding-bottom: 0;
  }

  .tn-tabs_soft {
    height: 72px;
    background-image: none;
  }
}

.notifications-widget__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  width: 100%;
}

.notifications-widget__empty {
  display: block;
  width: 100%;
  padding-top: 24px;

  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: var(--notifications-widget-empty-color);
}

.v-popper--theme-notifications {
  .v-popper__inner {
    overflow-y: hidden;
    border-radius: 24px;
    box-shadow: var(--notifications-widget-dropdown-shadow);
  }
}
</style>

