<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { ITnSelectItem } from "@/components/uikit/elements/select/typings";

import TnButton from "@/components/uikit/elements/button/tn-button.vue";
import LangSelect from "@/components/widgets/lang-select/lang-select.vue";
import TnDropdownMenu from "@/components/uikit/elements/dropdown/tn-dropdown-menu.vue";
import TnDropdownMenuItem from "@/components/uikit/elements/dropdown/tn-dropdown-menu-item.vue";
import TnAvatar from "@/components/uikit/elements/avatar/tn-avatar.vue";
import TnDatepicker from "@/components/uikit/elements/datepicker/tn-datepicker.vue";
import TNCalendar from "@/components/uikit/elements/datepicker/tn-calendar.vue";
import TnSelect from "@/components/uikit/elements/select/tn-select.vue";
import TnMultiSelect from "@/components/uikit/elements/multi-select/tn-multi-select.vue";
import TnSelectPersonItem from "@/components/uikit/elements/select/components/person-item.vue";

onMounted(() => {});

const language = useLocalStorage("risk.lang", "ru");

const date = ref(new Date(2025, 5, 15));
const daterange = ref<Date[]>([]);

const selectOptions: ITnSelectItem[] = [
  {
    id: Symbol(),
    label: "Option 1",
  },
  {
    id: Symbol(),
    label: "Option 2",
  },
  {
    id: Symbol(),
    label: "Option 3",
  },
  {
    id: Symbol(),
    label: "Option 4",
  },
  {
    id: Symbol(),
    label: "Option 5",
  },
  {
    id: Symbol(),
    label: "Option Option Option 5",
  },
  {
    id: Symbol(),
    label: "Option 6",
    disabled: true,
  },
];
const selectOptionsCustom: ITnSelectItem[] = [
  {
    id: Symbol(),
    label: "Лужков Роман",
    data: {
      image: 'https://i.pinimg.com/736x/4b/d3/04/4bd304c14c7e47b601d0482b235a89d2--hemsworth-brothers-chris-hemsworth.jpg',
      email: 'michael.mitc@example.com',
    }
  },
  {
    id: Symbol(),
    label: "Витюгова Юлия",
    data: {
      image: 'https://i1.sndcdn.com/artworks-zSogPvz7lPksaBrX-1GecVw-t500x500.jpg',
      email: 'tanya.hill@example.com',
    }
  },
  {
    id: Symbol(),
    label: "Камчатов Денис",
    data: {
      image: 'https://i.imgflip.com/65jzz8.jpg',
      email: 'kamchatov@mail.ru',
    }
  },
  {
    id: Symbol(),
    label: "Иван Иванов",
    data: {
      image: 'https://i.pinimg.com/736x/2c/a9/8b/2ca98b2ffc20d4981aa8ce3c2555956f.jpg',
      email: 'ivan@ivanov.ru',
    }
  },
]
const selectModel = ref<ITnSelectItem | null>(null);
const multiSelectModel = ref<ITnSelectItem[]>([]);

const selectModelCustom = ref<ITnSelectItem | null>(null);
const multiSelectModelCustom = ref<ITnSelectItem[]>([]);

const loading = ref<boolean>(false)

const performSearch = async (value: string): Promise<ITnSelectItem[]> => {
  loading.value = true
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(selectOptions.filter(
    (item) => item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
  ))
    }, 400);
  });
};

async function onSearch(value: string) {
  const result = await performSearch(value);
  loading.value = false
  return result
}

const performSearchCustom = async (value: string): Promise<ITnSelectItem[]> => {
  loading.value = true
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(selectOptionsCustom.filter(
    (item) => item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
  ))
    }, 400);
  });
};

async function onSearchCustom(value: string) {
  const result = await performSearchCustom(value);
  loading.value = false
  return result
}

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
      <TnDatepicker style="flex: 1; align-self: flex-end;" :label="`Дата`" :locale="language" v-model="date" />
      <TnDatepicker style="flex: 1; align-self: flex-end;" :floating-label="`Период`" :locale="language" v-model="daterange" range selectionMode="range" />
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

  <div class="uikit-section">
    <h2 class="uikit-section__title">Select</h2>
    <div class="uikit-section__items">
      <TnSelect style="flex: 1; align-self: flex-end;"
        :options="selectOptions"
        v-model="selectModel"
        :label="`Город`"
        :placeholder="`Выберите значение`"
        block
      ></TnSelect>
      <TnSelect style="flex: 1; align-self: flex-end;"
        :options="selectOptions"
        v-model="selectModel"
        :floating-label="`Город`"
        :placeholder="`Выберите значение`"
        block
      ></TnSelect>
    </div>

    <div class="uikit-section__items">
      <TnSelect style="flex: 1; align-self: flex-end;"
        :options="selectOptions"
        v-model="selectModel"
        :label="`Город`"
        :placeholder="`Выберите значение`"
        allow-empty-search
        :loading="loading"
        :search="onSearch"
        search-placeholder="Some search placeholder"
        empty-search-result-text="Ничего не найдено"
        block
      >
      </TnSelect>
    </div>
    <div class="uikit-section__items">
      {{ selectModel }}
    </div>
  </div>

  <div class="uikit-section">
    <h2 class="uikit-section__title">Multi Select</h2>
    <div class="uikit-section__items">
      <TnMultiSelect
        :options="selectOptions"
        v-model="multiSelectModel"
        :label="`Город`"
        :placeholder="`Выберите значение`"
        :loading="loading"
        search-placeholder="Some search placeholder"
        empty-search-result-text="Ничего не найдено"
        :search="onSearch"
        block
      >

      </TnMultiSelect>
    </div>
  </div>

  <div class="uikit-section">
    <h2 class="uikit-section__title">Select Custom</h2>
    <div class="uikit-section__items">
      <TnSelect style="flex: 1; align-self: flex-end;"
        :options="selectOptionsCustom"
        v-model="selectModelCustom"
        :label="`Город`"
        :placeholder="`Выберите значение`"
        block
      >
        <template v-slot:option-item="slotOption">
          <TnSelectPersonItem
            :image="slotOption.item.data?.image"
            :label="slotOption.item.label"
            :email="slotOption.item.data?.email"
          />
        </template>
      </TnSelect>
      <TnSelect style="flex: 1; align-self: flex-end;"
        :options="selectOptionsCustom"
        v-model="selectModelCustom"
        :floating-label="`Город`"
        :placeholder="`Выберите значение`"
        block
      >
        <template v-slot:option-item="slotOption">
          <TnSelectPersonItem
            :image="slotOption.item.data?.image"
            :label="slotOption.item.label"
            :email="slotOption.item.data?.email"
          />
        </template>
      </TnSelect>
    </div>

    <div class="uikit-section__items">
      <TnSelect style="flex: 1; align-self: flex-end;"
        :options="selectOptionsCustom"
        v-model="selectModelCustom"
        :label="`Город`"
        :placeholder="`Выберите значение`"
        allow-empty-search
        :search="onSearchCustom"
        :loading="loading"
        search-placeholder="Some search placeholder"
        empty-search-result-text="Ничего не найдено"
        block
      >
        <template v-slot:option-item="slotOption">
          <TnSelectPersonItem
            :image="slotOption.item.data?.image"
            :label="slotOption.item.label"
            :email="slotOption.item.data?.email"
          />
        </template>
      </TnSelect>
    </div>
    <div class="uikit-section__items">
      {{ selectModelCustom }}
    </div>
  </div>

  <div class="uikit-section">
    <h2 class="uikit-section__title">Multi Select Custom</h2>
    <div class="uikit-section__items">
      <TnMultiSelect
        :options="selectOptionsCustom"
        v-model="multiSelectModelCustom"
        :label="`Город`"
        :placeholder="`Выберите значение`"
        :loading="loading"
        search-placeholder="Some search placeholder"
        empty-search-result-text="Ничего не найдено"
        :search="onSearchCustom"
        block
      >
        <template v-slot:multi-select-item="slotOption">
          <TnSelectPersonItem
            :image="slotOption.item.data?.image"
            :label="slotOption.item.label"
            :email="slotOption.item.data?.email"
          />
        </template>
      </TnMultiSelect>
    </div>
  </div>
  <!-- <div class="uikit-section">
    <h2 class="uikit-section__title">Drag Filter</h2>
    <div class="uikit-section__items">
      <TnSelect
        :options="selectOptions"
        v-model="selectModel"
        :floating-label="`Город`"
        :placeholder="`Выберите значение`"
        block
      ></TnSelect>
    </div>
    <div class="uikit-section__items">
      {{ dragModel }}
    </div>
  </div> -->
</template>

<style lang="scss">
</style>
