<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";

import { TNTabsOption } from "@/components/uikit/tabs/typings";
import { TNChipsOption } from "@/components/uikit/chips/typings";
import { IAvatarGroupItem } from "@/components/uikit/avatar-group/typings";
import { TNRadioButtonOption } from "@/components/uikit/radio/typings";
import { IHomepageNavFirst } from "@/layouts/homepage-layout/components/header-nav-first/typings";
import { ISignificanceStatuses } from "@/components/uikit/significance/typings";

import TnBadge from "@/components/uikit/badge/tn-badge.vue";
import TnIcon from "@/components/uikit/icons/tn-icon.vue";
import TnButton from "@/components/uikit/button/tn-button.vue";
import TnTumbler from "@/components/uikit/tumbler/tn-tumbler.vue";
import TnRadio from "@/components/uikit/radio/tn-radio.vue";
import TnAvatar from "@/components/uikit/avatar/tn-avatar.vue";
import TnAvatarGroup from "@/components/uikit/avatar-group/tn-avatar-group.vue";
import TnCheckbox from "@/components/uikit/checkbox/tn-checkbox.vue";
import TnInput from "@/components/uikit/input/tn-input.vue";
import TnTextarea from "@/components/uikit/textarea/tn-textarea.vue";
import TnTabs from "@/components/uikit/tabs/tn-tabs.vue";
import TnChips from "@/components/uikit/chips/tn-chips.vue";
import TnNotification from "@/components/uikit/notification/tn-notification.vue";
import TnAlert from "@/components/uikit/alert/tn-alert.vue";
import TnSearch from "@/components/uikit/search/tn-search.vue";
import TnSignificance from "@/components/uikit/significance/tn-significance.vue";
import TnSignificanceSelect from "@/components/uikit/significance/tn-significance-select.vue";

import HomepageButton from "@/layouts/homepage-layout/components/header-button/header-button.vue";
import HomepageNavFirst from "@/layouts/homepage-layout/components/header-nav-first/header-nav-first.vue";

import DropdownSection from "./sections/dropdown-section.vue";

const language = useLocalStorage("risk.lang", "ru");

const isTumblerActive = ref<boolean>(false);
const isCheckboxActive = ref<boolean>(false);
const animalAsObject = ref<TNRadioButtonOption | null>(null);
const searchValue = ref<string>("");
const currentOptionId = ref<string | number>(0);
const currentNavFirstOptionUrl = ref<IHomepageNavFirst["urlName"]>("MainPage");
const searchResult = ref<any[]>([
  {
    title: "Граница обучения кадров сделала своё дело",
    id: "1",
  },
  {
    title: "Сейчас всё чаще звучит ласковый перезвон вертикали власти",
    id: "2",
  },
  {
    title:
      "Цена вопроса не важна, когда сознание наших соотечественников не замутнено пропагандой",
    id: "3",
  },
  {
    title: "Эксперты утверждают, что частотность поисковых запросов бодрит",
    id: "4",
  },
]);

const checkArr = ref<unknown[]>([]);
const checkArrObj = ref<unknown[]>([]);
const checkboxList = ref<
  {
    label?: string;
    isActive?: boolean;
    disabled?: boolean;
    readonly?: boolean;
  }[]
>([
  {
    label: "Label 1",
    isActive: false,
  },
  {
    label: "Label 2",
    isActive: false,
  },
  {
    isActive: false,
  },
  {
    label: "Label 4",
    isActive: false,
    disabled: true,
  },
  {
    label: "Label 4",
    isActive: true,
    readonly: true,
  },
]);

const currentSignificance = ref<ISignificanceStatuses | null>(
  ISignificanceStatuses.empty
);

const animal1 = reactive({
  id: "1",
  label: "Собака",
});
const animal2 = reactive({
  id: "2",
  label: "Кошка",
});
const animal3 = reactive({
  id: "3",
  label: "Крыса",
});
const animalAsObjectStringify = computed(() => {
  if (animalAsObject.value) {
    return JSON.stringify(animalAsObject.value);
  }
  return null;
});

const avatars = reactive<IAvatarGroupItem[]>([
  {
    image:
      "https://i.pinimg.com/originals/84/01/13/84011369742c4581e76047ec420733f2.jpg",
    alt: "some alt",
  },
  {
    icon: "plus",
    status: true,
  },
  {
    text: "A",
    status: false,
  },
  {
    text: "В",
  },
]);

const optionsWithIcons: TNTabsOption[] = [
  {
    id: 1,
    name: "Label 1",
    icon: {
      name: "menu",
    },
  },
  {
    id: 2,
    name: "Label 2",
  },
  {
    id: 3,
    name: "Label 3",
  },
  {
    id: 4,
    name: "Label 4",
    icon: {
      name: "plus",
    },
  },
];

let chipsOptions = ref<TNChipsOption[]>([
  {
    id: 1,
    name: "Label 1",
    avatar: {
      image:
        "https://i.pinimg.com/originals/84/01/13/84011369742c4581e76047ec420733f2.jpg",
      alt: "some alt",
    },
  },
  {
    id: 2,
    name: "Label 2",
  },
  {
    id: 3,
    name: "Label 3",
  },
  {
    id: 4,
    name: "Label 4",
    avatar: {
      text: "В",
    },
  },
  {
    id: 5,
    name: "Label 5",
    avatar: {
      image:
        "https://i.pinimg.com/originals/84/01/13/84011369742c4581e76047ec420733f2.jpg",
      alt: "some alt",
    },
    disabled: true,
  },
]);

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

function setTumblerState(state: boolean) {
  isTumblerActive.value = state;
}

function collectSearchValue(value: string) {
  searchValue.value = value;
}

function deleteChipItem(itemId: TNChipsOption["id"]) {
  chipsOptions.value = chipsOptions.value.filter((item) => item.id !== itemId);
}

function clearInput() {
  searchValue.value = "";
}
</script>

<template>
  <div class="uikit-page">
    <!-- Badge -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Badge</h2>

      <h5 class="uikit-page__block-subtitle">Classic Small</h5>
      <div class="uikit-page__block-items">
        <TnBadge classic><TnIcon name="menu" /></TnBadge>
        <TnBadge classic>9</TnBadge>
        <TnBadge classic>92</TnBadge>
        <TnBadge classic>new</TnBadge>
      </div>

      <h5 class="uikit-page__block-subtitle">Classic Large</h5>
      <div class="uikit-page__block-items">
        <TnBadge classic size="lg"><TnIcon name="menu" /></TnBadge>
        <TnBadge classic size="lg">9</TnBadge>
        <TnBadge classic size="lg">92</TnBadge>
        <TnBadge classic size="lg">new</TnBadge>
      </div>

      <h5 class="uikit-page__block-subtitle">Default</h5>
      <div class="uikit-page__block-items">
        <TnBadge default-type><TnIcon name="menu" /></TnBadge>
        <TnBadge default-type>9</TnBadge>
        <TnBadge default-type>92</TnBadge>
        <TnBadge default-type>new</TnBadge>
      </div>
    </div>

    <!-- Buttons -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Buttons</h2>

      <h5 class="uikit-page__block-subtitle">Primary Large</h5>
      <div class="uikit-page__block-items">
        <TnButton primary>Button</TnButton>

        <TnButton primary>
          Button
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton primary>
          <template #icon>
            <TnIcon name="plus" />
          </template>
          Button
        </TnButton>

        <TnButton primary>
          Button
          <template #icon-right>
            <TnBadge default-type>92</TnBadge>
          </template>
        </TnButton>

        <TnButton primary>
          <template #icon>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton primary disabled>Button</TnButton>
        <TnButton primary loading>Button</TnButton>
      </div>

      <h5 class="uikit-page__block-subtitle">Primary Medium</h5>
      <div class="uikit-page__block-items">
        <TnButton primary size="md">Button</TnButton>

        <TnButton primary size="md">
          Button
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton primary size="md">
          <template #icon>
            <TnIcon name="plus" />
          </template>
          Button
        </TnButton>

        <TnButton primary size="md">
          Button
          <template #icon-right>
            <TnBadge default-type>92</TnBadge>
          </template>
        </TnButton>

        <TnButton primary size="md">
          <template #icon>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton primary size="md" disabled>Button</TnButton>
        <TnButton primary size="md" loading>Button</TnButton>
      </div>

      <h5 class="uikit-page__block-subtitle">Secondary Large</h5>
      <div class="uikit-page__block-items">
        <TnButton secondary size="lg">Button</TnButton>

        <TnButton secondary size="lg">
          Button
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton secondary size="lg">
          <template #icon>
            <TnIcon name="plus" />
          </template>
          Button
        </TnButton>

        <TnButton secondary size="lg">
          Button
          <template #icon-right>
            <TnBadge default-type>92</TnBadge>
          </template>
        </TnButton>

        <TnButton secondary size="lg">
          <template #icon>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton secondary size="lg" disabled>Button</TnButton>
        <TnButton secondary size="lg" loading>Button</TnButton>
      </div>

      <h5 class="uikit-page__block-subtitle">Secondary Medium</h5>
      <div class="uikit-page__block-items">
        <TnButton secondary size="md">Button</TnButton>

        <TnButton secondary size="md">
          Button
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton secondary size="md">
          <template #icon>
            <TnIcon name="plus" />
          </template>
          Button
        </TnButton>

        <TnButton secondary size="md">
          Button
          <template #icon-right>
            <TnBadge default-type>92</TnBadge>
          </template>
        </TnButton>

        <TnButton secondary size="md">
          <template #icon>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton secondary size="md" disabled>Button</TnButton>
        <TnButton secondary size="md" loading>Button</TnButton>
      </div>
    </div>

    <!-- Tumbler -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Tumbler</h2>

      <h5 class="uikit-page__block-subtitle">Tumbler Large</h5>
      <div class="uikit-page__block-items">
        <TnTumbler
          :modelValue="isTumblerActive"
          @update:modelValue="setTumblerState"
          size="lg"
        ></TnTumbler>
        <TnTumbler
          :modelValue="isTumblerActive"
          @update:modelValue="setTumblerState"
          icon="star"
          size="lg"
        ></TnTumbler>
        <TnTumbler
          :modelValue="isTumblerActive"
          @update:modelValue="setTumblerState"
          size="lg"
          disabled
        ></TnTumbler>
        <TnTumbler
          :modelValue="isTumblerActive"
          @update:modelValue="setTumblerState"
          icon="star"
          size="lg"
          disabled
        ></TnTumbler>
      </div>

      <h5 class="uikit-page__block-subtitle">Tumbler Medium</h5>
      <div class="uikit-page__block-items">
        <TnTumbler
          :modelValue="isTumblerActive"
          @update:modelValue="setTumblerState"
          size="md"
        ></TnTumbler>
        <TnTumbler
          :modelValue="isTumblerActive"
          @update:modelValue="setTumblerState"
          icon="star"
          size="md"
        ></TnTumbler>
        <TnTumbler
          :modelValue="isTumblerActive"
          @update:modelValue="setTumblerState"
          size="md"
          disabled
        ></TnTumbler>
        <TnTumbler
          :modelValue="isTumblerActive"
          @update:modelValue="setTumblerState"
          icon="star"
          size="md"
          disabled
        ></TnTumbler>
      </div>
    </div>

    <!-- Radiobox -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Radiobox</h2>
      <TnRadio
        :item-value="animal3"
        :summary-value="animalAsObject"
        @input="animalAsObject = $event"
      />
      <TnRadio
        :item-value="animal3"
        :summary-value="animalAsObject"
        @input="animalAsObject = $event"
        disabled
      />

      <TnRadio
        :item-value="animal3"
        :summary-value="animalAsObject"
        @input="animalAsObject = $event"
        readonly
      />
      <h5 class="uikit-page__block-subtitle">Radiobox List</h5>
      <div class="uikit-page__block-items">
        <TnRadio
          :item-value="animal1"
          :summary-value="animalAsObject"
          @input="animalAsObject = $event"
        />
        <TnRadio
          :item-value="animal2"
          :summary-value="animalAsObject"
          @input="animalAsObject = $event"
        />

        {{ animalAsObjectStringify }}
      </div>
    </div>

    <!-- Avatar -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Avatar</h2>

      <h5 class="uikit-page__block-subtitle">Avatar Large</h5>
      <div class="uikit-page__block-items">
        <TnAvatar
          v-for="(avatar, index) in avatars"
          :key="index"
          :image="avatar?.image"
          :text="avatar?.text"
          :icon="avatar?.icon"
          :alt="avatar?.alt"
          :status="avatar?.status"
          size="lg"
        />
        <TnAvatar
          v-if="avatars.length > 3"
          size="lg"
          :text="`+${avatars.length - 3}`"
          collapsed
        />
      </div>

      <h5 class="uikit-page__block-subtitle">Avatar Medium</h5>
      <div class="uikit-page__block-items">
        <TnAvatar
          v-for="(avatar, index) in avatars"
          :key="index"
          :image="avatar?.image"
          :text="avatar?.text"
          :icon="avatar?.icon"
          :alt="avatar?.alt"
          :status="avatar?.status"
          size="md"
        />
        <TnAvatar
          v-if="avatars.length > 3"
          size="md"
          :text="`+${avatars.length - 3}`"
          collapsed
        />
      </div>

      <h5 class="uikit-page__block-subtitle">Avatar Small</h5>
      <div class="uikit-page__block-items">
        <TnAvatar
          v-for="(avatar, index) in avatars"
          :key="index"
          :image="avatar?.image"
          :text="avatar?.text"
          :icon="avatar?.icon"
          :alt="avatar?.alt"
          :status="avatar?.status"
          size="sm"
        />
        <TnAvatar
          v-if="avatars.length > 3"
          size="sm"
          :text="`+${avatars.length - 3}`"
          collapsed
        />
      </div>
    </div>

    <!-- Avatar Group -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Avatar Group</h2>

      <h5 class="uikit-page__block-subtitle">Avatar Group Large</h5>
      <div class="uikit-page__block-items">
        <TnAvatarGroup size="lg" :avatars="avatars"> </TnAvatarGroup>
      </div>

      <h5 class="uikit-page__block-subtitle">Avatar Group Medium</h5>
      <div class="uikit-page__block-items">
        <TnAvatarGroup size="md" :avatars="avatars"> </TnAvatarGroup>
      </div>

      <h5 class="uikit-page__block-subtitle">Avatar Group Small</h5>
      <div class="uikit-page__block-items">
        <TnAvatarGroup size="sm" :avatars="avatars"> </TnAvatarGroup>
      </div>
    </div>

    <!-- Checkbox -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Checkbox</h2>

      <div class="uikit-page__block-items">
        <TnCheckbox v-model="isCheckboxActive" value="done">is done</TnCheckbox>
        <TnCheckbox v-model="isCheckboxActive" value="hidden" :disabled="true"
          >is hidden</TnCheckbox
        >
        <TnCheckbox v-model="isCheckboxActive" value="shared" :readonly="true"
          >is shared</TnCheckbox
        >
      </div>

      <h5 class="uikit-page__block-subtitle">Checkbox list</h5>
      <div class="uikit-page__block-items">
        <TnCheckbox v-model="checkArr" value="hidden">is hidden</TnCheckbox>
        <TnCheckbox v-model="checkArr" value="shared">is shared</TnCheckbox>

        <p style="width: 100%">Value: {{ checkArr }}</p>
      </div>

      <h5 class="uikit-page__block-subtitle">Checkbox list Obj</h5>
      <div class="uikit-page__block-items">
        <TnCheckbox
          v-for="(item, index) in checkboxList"
          :key="index"
          v-model="checkArrObj"
          :value="item"
          :disabled="item.disabled"
          :readonly="item.readonly"
        >
          {{ item.label }}
        </TnCheckbox>

        <p style="width: 100%">Value: {{ checkArrObj }}</p>
      </div>
    </div>

    <!-- Input -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Input</h2>

      <h5 class="uikit-page__block-subtitle">With floating label</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          :required="false"
        >
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
        >
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>

          <template #icon>
            <TnIcon name="menu" />
          </template>
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          disabled
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          readonly
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          description="This is the description area"
          error
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>
      </div>

      <h5 class="uikit-page__block-subtitle">With label</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          placeholder="Placeholder"
          :required="false"
        >
        </TnInput>

        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          placeholder="Placeholder"
        >
        </TnInput>

        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          placeholder="Placeholder"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>

        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          placeholder="Placeholder"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>

          <template #icon>
            <TnIcon name="menu" />
          </template>
        </TnInput>

        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          placeholder="Placeholder"
          disabled
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>

        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          placeholder="Placeholder"
          readonly
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>

        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          placeholder="Placeholder"
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>

        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          @clear="clearInput"
          placeholder="Placeholder"
          description="This is the description area"
          error
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>
      </div>
    </div>

    <!-- Textarea -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Textarea</h2>

      <h5 class="uikit-page__block-subtitle">With floating label</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnTextarea
          floatingLabel="label"
          v-model="searchValue"
          :required="false"
        >
        </TnTextarea>

        <p>Max Haight 100</p>
        <TnTextarea
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          v-model="searchValue"
          :required="false"
          :max-height="100"
        >
        </TnTextarea>

        <TnTextarea
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
        >
        </TnTextarea>

        <TnTextarea
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
        >
          <template #icon-right>
            <TnIcon name="plchevron-downus" />
          </template>
        </TnTextarea>

        <TnTextarea
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
        >
          <template #icon-right>
            <TnIcon name="chevron-down" />
          </template>

          <template #icon>
            <TnIcon name="plus" />
          </template>
        </TnTextarea>

        <TnTextarea
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          disabled
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="chevron-down" />
          </template>
        </TnTextarea>

        <TnTextarea
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          readonly
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="chevron-down" />
          </template>
        </TnTextarea>

        <TnTextarea
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="chevron-down" />
          </template>
        </TnTextarea>

        <TnTextarea
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          description="This is the description area"
          error
        >
          <template #icon-right>
            <TnIcon name="chevron-down" />
          </template>
        </TnTextarea>
      </div>

      <h5 class="uikit-page__block-subtitle">With label</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnTextarea
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
          :required="false"
        >
        </TnTextarea>

        <p>Max Haight 100</p>
        <TnTextarea
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
          :required="false"
          :max-height="100"
        >
        </TnTextarea>

        <TnTextarea
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
        >
        </TnTextarea>

        <TnTextarea
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnTextarea>

        <TnTextarea
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
        >
          <template #icon-right>
            <TnIcon name="chevron-down" />
          </template>

          <template #icon>
            <TnIcon name="plus" />
          </template>
        </TnTextarea>

        <TnTextarea
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
          disabled
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="chevron-down" />
          </template>
        </TnTextarea>

        <TnTextarea
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
          readonly
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="chevron-down" />
          </template>
        </TnTextarea>

        <TnTextarea
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="chevron-down" />
          </template>
        </TnTextarea>

        <TnTextarea
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
          description="This is the description area"
          error
        >
          <template #icon-right>
            <TnIcon name="chevron-down" />
          </template>
        </TnTextarea>
      </div>
    </div>

    <!-- Tabs -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Tabs</h2>

      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnTabs
          v-model="currentOptionId"
          :options="optionsWithIcons"
          :soft="false"
        />
      </div>

      <h5 class="uikit-page__block-subtitle">Soft</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnTabs v-model="currentOptionId" :options="optionsWithIcons" />
      </div>
    </div>

    <!-- Chips -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Chips</h2>

      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnChips
          v-model="currentOptionId"
          :options="chipsOptions"
          @delete="deleteChipItem"
        />
      </div>

      <h5 class="uikit-page__block-subtitle">Disabled</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnChips
          v-model="currentOptionId"
          :options="chipsOptions"
          disabled
          @delete="deleteChipItem"
        />
      </div>
    </div>

    <!-- Notifications -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Notification</h2>

      <h5 class="uikit-page__block-subtitle">With Icon</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnNotification
          title="Актуализация рисков проведена"
          description="Теперь, нужно актуализировать список контрольных процедур для приказа"
          icon="alert-circle"
        >
          <template #button>
            <TnButton>Актулизировать КП</TnButton>
          </template>
        </TnNotification>
      </div>

      <h5 class="uikit-page__block-subtitle">Without Icon</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnNotification
          title="Актуализация рисков проведена"
          description="Теперь, нужно актуализировать список контрольных процедур для приказа"
        >
          <template #button>
            <TnButton>Актулизировать КП</TnButton>
          </template>
        </TnNotification>
      </div>
    </div>

    <!-- Alert -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Alert</h2>

      <h5 class="uikit-page__block-subtitle">Error</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnAlert error>
          <template #buttons>
            <TnButton size="md">Нет</TnButton>
            <TnButton size="md">Да</TnButton>
          </template>
        </TnAlert>

        <TnAlert
          error
          description="В своём стремлении улучшить пользовательский опыт мы упускаем, что базовые сценарии поведения пользователей будут призваны."
        >
          <template #buttons>
            <TnButton size="md">Нет</TnButton>
            <TnButton size="md">Да</TnButton>
          </template>
        </TnAlert>

        <TnAlert error>
          <template #buttons>
            <TnButton is-icon icon="x"></TnButton>
          </template>
        </TnAlert>
      </div>

      <h5 class="uikit-page__block-subtitle">Warning</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnAlert warning>
          <template #buttons>
            <TnButton size="md">Нет</TnButton>
            <TnButton size="md">Да</TnButton>
          </template>
        </TnAlert>

        <TnAlert
          warning
          description="В своём стремлении улучшить пользовательский опыт мы упускаем, что базовые сценарии поведения пользователей будут призваны."
        >
          <template #buttons>
            <TnButton size="md">Нет</TnButton>
            <TnButton size="md">Да</TnButton>
          </template>
        </TnAlert>

        <TnAlert warning>
          <template #buttons>
            <TnButton is-icon icon="x"></TnButton>
          </template>
        </TnAlert>
      </div>

      <h5 class="uikit-page__block-subtitle">Success</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnAlert>
          <template #buttons>
            <TnButton size="md">Нет</TnButton>
            <TnButton size="md">Да</TnButton>
          </template>
        </TnAlert>

        <TnAlert
          description="В своём стремлении улучшить пользовательский опыт мы упускаем, что базовые сценарии поведения пользователей будут призваны."
        >
          <template #buttons>
            <TnButton size="md">Нет</TnButton>
            <TnButton size="md">Да</TnButton>
          </template>
        </TnAlert>

        <TnAlert>
          <template #buttons>
            <TnButton is-icon icon="x"></TnButton>
          </template>
        </TnAlert>
      </div>
    </div>

    <!-- HomepageButtonn -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">HomepageButton</h2>

      <h5 class="uikit-page__block-subtitle">Logo</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <HomepageButton logo></HomepageButton>
      </div>

      <h5 class="uikit-page__block-subtitle">Menu</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <HomepageButton icon="menu">Структура СВК</HomepageButton>
      </div>

      <h5 class="uikit-page__block-subtitle">Profile</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <HomepageButton>
          <div class="homepage-profile">
            <TnAvatar
              size="md"
              image="https://i.pinimg.com/originals/84/01/13/84011369742c4581e76047ec420733f2.jpg"
            />

            <div class="homepage-profile__text-block">
              <p class="homepage-profile__name">Егоренко А.</p>
              <p class="homepage-profile__role">Контролер</p>
            </div>

            <TnIcon
              class="homepage-profile__icon"
              name="chevron-down"
              :size="16"
            />
          </div>
        </HomepageButton>
      </div>

      <!-- TODO: Внутри Notification должна быть информация об уведомлениях, если есть добавляется красная точка и меняется иконка -->
      <!-- Подумать, мб лучше сделать отдельным компонентом -->
      <h5 class="uikit-page__block-subtitle">Notification</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <HomepageButton icon="bell"></HomepageButton>
      </div>
    </div>

    <!-- Search -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Search</h2>

      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnSearch
          v-model="searchValue"
          :result="searchResult"
          show-result
          search-hint="Введите что-нибудь для поиска"
          nothing-found-title="Я ничего не нашёл"
          :light="false"
        />
        <!-- @update:modelValue="searchUpdateHandlerEmpty" -->
      </div>
    </div>

    <!-- HomepageNavFirst -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">HomepageNavFirst</h2>

      <div class="uikit-page__block-items uikit-page__block-items_column">
        <HomepageNavFirst
          v-model="currentNavFirstOptionUrl"
          :options="navFirstOptions"
        />
      </div>
    </div>

    <!-- Significance -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Significance</h2>

      <div class="uikit-page__block-items">
        <TnSignificance
          :locale="language"
          style="width: fit-content"
          :shown-label="false"
          :value="currentSignificance"
        />
        <TnSignificance
          :locale="language"
          style="width: fit-content"
          :shown-label="false"
          :value="currentSignificance"
          disabled
        />
      </div>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnSignificance
          :locale="language"
          style="width: fit-content"
          :value="currentSignificance"
        />
        <TnSignificance
          :locale="language"
          style="width: fit-content"
          :value="currentSignificance"
          disabled
        />
      </div>
    </div>

    <!-- SignificanceSelect -->
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Significance Select</h2>

      <div class="uikit-page__block-items">
        <TnSignificanceSelect v-model="currentSignificance" :locale="language">
          <TnSignificance
            :locale="language"
            :value="currentSignificance"
          />
        </TnSignificanceSelect>
      </div>

      <h5 class="uikit-page__block-subtitle">Significance Select without label</h5>
      <div class="uikit-page__block-items">
        <TnSignificanceSelect v-model="currentSignificance" :locale="language">
          <TnSignificance
            :locale="language"
            :value="currentSignificance"
            :shownLabel="false"
          />
        </TnSignificanceSelect>
      </div>

      <h5 class="uikit-page__block-subtitle">Significance Select Disabled</h5>
      <div class="uikit-page__block-items">
        <TnSignificanceSelect v-model="currentSignificance" :locale="language" disabled>
          <TnSignificance :locale="language" disabled :value="currentSignificance" />
        </TnSignificanceSelect>
      </div>
    </div>

    <DropdownSection />
  </div>
</template>

<style lang="scss">
.uikit-page {
  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 130px 96px 240px 96px;
  margin: 0 auto;

  background-color: #fff;

  .uikit-page__block {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .uikit-page__block-title {
    margin: 0 0 10px 0;
  }
  .uikit-page__block-items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .uikit-page__block-items_column {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
}

.homepage-profile {
  display: flex;
  align-items: center;
  gap: 8px;

  min-width: 167px;

  .homepage-profile__text-block {
    text-align: left;
  }

  .homepage-profile__name {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;

    color: #2e384b;
  }

  .homepage-profile__role {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;

    color: #747c8c;
  }

  .homepage-profile__icon {
    transform: rotate(-90deg);
    margin-left: auto;
  }
}

.uikit-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.uikit-section__title {
  margin: 0 0 10px 0;
}

.uikit-section__items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
@/layouts/homepage-layout/components/header-nav-first/typings
