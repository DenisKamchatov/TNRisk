<script setup lang="ts">
import { logger } from "@/common/utils/logger";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

defineEmits(["click"]);

const { t } = useI18n({ useScope: "local" });

const icons = ref<string[]>([]);
const iconSets = ref<IconSet[]>([]);

interface IconSet {
  id: number;
  name: string;
  list: string[];
}

function parseIcons() {
  document.querySelectorAll(".svg-icon-pack > symbol").forEach((el) => {
    icons.value.push(el.id.split("--")[1]);
  });
  // console.log("ICONS:", icons.value);
}

function parseIconSets() {
  const nodes = document.querySelector(".svg-icon-pack")?.childNodes;
  if (!nodes?.length) return;

  let currentSet: IconSet = {
    id: 0,
    name: "noname",
    list: [],
  };

  for (let i = 0; i < nodes.length; i++) {
    const el = nodes[i];

    if (el.nodeName === "#comment") {
      if (currentSet.list.length) {
        iconSets.value.push(currentSet);
      }

      currentSet = {
        id: currentSet.id++,
        name: el.nodeValue?.split("::")[1].trim() || "",
        list: [],
      };
    } else {
      currentSet.list.push((el as Element).id.split("--")[1]);
    }
  }

  if (currentSet.list.length) {
    iconSets.value.push(currentSet);
  }

  // console.log("NODES:", nodes, iconSets);
}

function onCopied(text: string) {
  logger.log("copied", text);
}

onMounted(() => {
  setTimeout(() => {
    parseIcons();
    parseIconSets();
  }, 10);
});
</script>

<template>
  <div class="uikit-page icons-page">
    <div class="uikit-page__block">
      <h2 class="uikit-page__block-title">{{ t("pageTitle") }}</h2>
      <div>
        <div v-for="item in iconSets" :key="item.name">
          <h3 class="icon-set__title">{{ item.name }}:</h3>
          <div class="icon-set__list">
            <div
              class="icon-set__item"
              v-for="icon in item.list"
              :key="icon"
              v-tooltip="icon"
              v-copy="`${icon}`"
              v-copy:callback="onCopied"
            >
              <TNIcon
                intext
                :name="icon"
                :title="icon"
                class="border-gray-200 border-solid border rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.icon-set__title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
}
.icon-set__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  max-width: 800px;
}

.icon-set__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  padding: 16px;
  border-radius: 50%;
  cursor: pointer;

  transition: all 0.25s 0s ease;

  &:hover {
    background-color: var(--background-accent-enabled);
    color: #fff;
  }
}

.icon-set__item-title {
  font-size: 14px;
}
</style>

<i18n>
{
  "en": {
    "pageTitle": "Icon set"
  },
  "ru": {
    "pageTitle": "Иконки"
  }
}
</i18n>
