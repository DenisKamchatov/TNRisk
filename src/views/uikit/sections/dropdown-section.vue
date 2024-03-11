<script setup lang="ts">
import { onMounted, ref } from "vue";
import TnButton from "@/components/uikit/button/tn-button.vue";
import LangSelect from "@/components/widgets/lang-select/lang-select.vue";
import TnDropdownMenu from "@/components/uikit/dropdown/tn-dropdown-menu.vue";
import TnDropdownMenuItem from "@/components/uikit/dropdown/tn-dropdown-menu-item.vue";
import TnAvatar from "@/components/uikit/avatar/tn-avatar.vue";
import { useLocalStorage } from "@vueuse/core";
import TnDatepicker from "@/components/uikit/datepicker/tn-datepicker.vue";
import TNCalendar from "@/components/uikit/datepicker/tn-calendar.vue";

onMounted(() => {});

const language = useLocalStorage("risk.lang", "ru");

const date = ref(new Date(2025, 5, 15));
const daterange = ref<Date[]>([]);
</script>

<template>
  <div class="uikit-section">
    <h2 class="uikit-section__title">Tooltips</h2>
    <div class="uikit-section__items">
      <TnButton primary v-tooltip.top="`Tooltip top`">Tooltip top</TnButton>
      <TnButton primary v-tooltip.bottom="`Tooltip bottom`">Tooltip bottom</TnButton>
      <TnButton primary v-tooltip.left="`Tooltip left`">Tooltip left</TnButton>
      <TnButton primary v-tooltip.right="`Tooltip right`">Tooltip right</TnButton>
    </div>
  </div>
  <div class="uikit-section">
    <h2 class="uikit-section__title">Language Select</h2>
    <div class="uikit-section__items">
      <LangSelect v-model="language" />
    </div>
  </div>
  <div class="uikit-section">
    <h2 class="uikit-section__title">Dropdown Menu</h2>
    <div class="uikit-section__items">
      <TnDropdownMenu>
        <template #menu>
          <TnDropdownMenu nested>
            <TnDropdownMenuItem nested>Просто посмотреть</TnDropdownMenuItem>
            <template #menu>
              <TnDropdownMenuItem>Полюбоваться</TnDropdownMenuItem>
              <TnDropdownMenuItem>Повертеть в руках</TnDropdownMenuItem>
              <TnDropdownMenu nested>
                <TnDropdownMenuItem nested>Разглядывать внимательно</TnDropdownMenuItem>
                <template #menu>
                  <TnDropdownMenuItem>Удивляться деталям</TnDropdownMenuItem>
                  <TnDropdownMenuItem>Находить изъяны</TnDropdownMenuItem>
                </template>
              </TnDropdownMenu>
            </template>
          </TnDropdownMenu>
          <TnDropdownMenuItem icon="pencil">Редактировать</TnDropdownMenuItem>
          <TnDropdownMenuItem icon="trash">Удалить</TnDropdownMenuItem>
          <TnDropdownMenuItem>
            <template #icon>
              <TnAvatar size="sm" image="https://i.pravatar.cc/64" />
            </template>
            Автор
          </TnDropdownMenuItem>
        </template>
      </TnDropdownMenu>

      <TnDropdownMenu :placement="`bottom-start`" search>
        <TnButton action>Открыть меню</TnButton>
        <template #menu>
          <TnDropdownMenuItem icon="pencil">Редактировать</TnDropdownMenuItem>
          <TnDropdownMenuItem icon="trash">Удалить</TnDropdownMenuItem>
        </template>
      </TnDropdownMenu>
    </div>
  </div>
  <div class="uikit-section">
    <h2 class="uikit-section__title">Datepicker</h2>
    <div class="uikit-section__items">
      <TnDatepicker :label="`Дата`" :locale="language" v-model="date" />
      <TnDatepicker :floating-label="`Период`" :locale="language" v-model="daterange" range selectionMode="range" />
    </div>
  </div>
  <div class="uikit-section">
    <h2 class="uikit-section__title">Inline calendars</h2>
    <div class="uikit-section__items">
      <TNCalendar v-model="date" :locale="language" />
      <TNCalendar v-model="daterange" :locale="language" selectionMode="range" />
    </div>
    <div class="uikit-section__items">
      {{ date }}
    </div>
    <div class="uikit-section__items">
      {{ daterange }}
    </div>
  </div>
</template>

<style lang="scss">
</style>
