<script setup lang="ts">
import { ref, reactive } from "vue";
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

const isTumblerActive = ref<boolean>(false);
const isCheckboxActive = ref<boolean>(false);
const animalAsObject = ref(undefined);
const searchValue = ref<String>("");

const animal1 = reactive({
  id: "1",
  label: "Собака",
});
const animal2 = reactive({
  id: "2",
  label: "Кошка",
});

function setTumblerState(state: boolean) {
  isTumblerActive.value = state;
}

function setCheckboxState(state: boolean) {
  isCheckboxActive.value = state;
}

const collectSearchValue = (value: String) => {
  searchValue.value = value;
};

const avatars = reactive([
  {
    image:
      "https://i.pinimg.com/originals/84/01/13/84011369742c4581e76047ec420733f2.jpg",
    alt: "some alt",
  },
  {
    icon: "plus",
  },
  {
    text: "A",
  },
  {
    text: "В",
  },
]);
</script>

<template>
  <div class="uikit-page">
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
            <!-- TODO: В дизайне нет такого вида Badge -->
            <TnBadge default-type>92</TnBadge>
          </template>
        </TnButton>

        <TnButton primary>
          <template #icon>
            <TnIcon name="plus" />
          </template>
        </TnButton>

        <TnButton primary disabled>Button</TnButton>
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
      </div>
    </div>

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

    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Radiobox</h2>

      <h5 class="uikit-page__block-subtitle"></h5>
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
      </div>
    </div>

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
          size="md"
        />
        <TnAvatar
          v-if="avatars.length > 3"
          size="md"
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

    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Checkbox</h2>

      <div class="uikit-page__block-items">
        <TnCheckbox
          :modelValue="isCheckboxActive"
          @update:modelValue="setCheckboxState"
        />

        <TnCheckbox
          :modelValue="isCheckboxActive"
          @update:modelValue="setCheckboxState"
          :disabled="true"
        />
      </div>
    </div>

    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Input</h2>

      <h5 class="uikit-page__block-subtitle">With floating label</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          :required="false"
        >
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
        >
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>

          <template #icon-left>
            <TnIcon name="menu" />
          </template>
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
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
          :model-value="searchValue"
          description="This is the description area"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>

        <TnInput
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
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
          :model-value="searchValue"
          placeholder="Placeholder"
          :required="false"
        >
        </TnInput>

        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
        >
        </TnInput>

        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>
        </TnInput>

        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          placeholder="Placeholder"
        >
          <template #icon-right>
            <TnIcon name="plus" />
          </template>

          <template #icon-left>
            <TnIcon name="menu" />
          </template>
        </TnInput>

        <TnInput
          label="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
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
          :model-value="searchValue"
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
          :model-value="searchValue"
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

    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">Textarea</h2>

      <h5 class="uikit-page__block-subtitle">With floating label</h5>
      <div class="uikit-page__block-items uikit-page__block-items_column">
        <TnTextarea
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
          :required="false"
        >
        </TnTextarea>

        <p>Max Haight 100</p>
        <TnTextarea
          floatingLabel="label"
          @update:modelValue="collectSearchValue"
          :model-value="searchValue"
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

          <template #icon-left>
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

          <template #icon-left>
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
  </div>
</template>

<style lang="scss">
.uikit-page {
  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 130px 96px 96px 96px;
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
    gap: 10px;
  }

  .uikit-page__block-items_column {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
}
</style>
