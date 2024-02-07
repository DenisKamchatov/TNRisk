<script lang="ts" setup>
import { computed } from "vue";
import TnIcon from "@/components/uikit/icons/tn-icon.vue";
// import { Avatar } from "@/typings/Avatar.ts";

const props = withDefaults(
  defineProps<{
    image?: string;
    icon?: string;
    alt?: string;
    text?: string;
    size?: "sm" | "md" | "lg";
    square?: boolean;
    collapsed?: boolean;
    status?: boolean;
  }>(),
  {
    size: "md",
    square: false,
    text: "",
    alt: "",
    collapsed: false,
    status: undefined,
  }
);

const colors = [
  {
    bg: "#B3D0FF",
    color: "#0062FF",
  },
  {
    bg: "#FFE4B3",
    color: "#FFA500",
  },
];

const currentColor = computed(() => {
  return colors[Math.floor(Math.random() * colors.length)];
});

const iconSize = computed(() => {
  return props.size === "sm" ? 24 : props.size === "lg" ? 40 : 32;
});

const hasImageOrIcon = computed(() => !!props.image || !!props.icon);
</script>

<template>
  <div
    class="tn-user-picture"
    :class="{
      'tn-user-picture_s': size === 'sm',
      'tn-user-picture_l': size === 'lg',
      'tn-user-picture_square': square,
    }"
    :style="{
      'background-color': collapsed
        ? '#0062ff'
        : !hasImageOrIcon
        ? currentColor.bg
        : '#e9ebf1',
    }"
  >
    <div class="tn-user-picture__container">
      <img
        v-if="image"
        class="tn-user-picture__image"
        :src="image"
        :alt="alt"
      />
      <TnIcon
        v-else-if="icon"
        class="tn-user-picture__icon"
        :size="iconSize"
        :name="icon"
      />

      <span
        class="tn-user-picture__span"
        v-if="text"
        :style="{
          color: collapsed
            ? '#fff'
            : !hasImageOrIcon
            ? currentColor.color
            : '#4E525C',
        }"
      >
        {{ text }}
      </span>
    </div>
    <div
      v-if="typeof status === 'boolean'"
      class="tn-user-picture__status"
      :class="{ 'tn-user-picture__status_enabled': status }"
    ></div>
  </div>
</template>

<style lang="scss">
.tn-user-picture {
  background-color: #e9ebf1;
  border: 1px solid #fff;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  position: relative;
  user-select: none;
  border-radius: 50%;
}

.tn-user-picture__container {
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  height: 100%;
}

.tn-user-picture_s {
  width: 24px;
  height: 24px;
}

.tn-user-picture_l {
  width: 40px;
  height: 40px;
}

.tn-user-picture_square,
.tn-user-picture_square .tn-user-picture__container {
  border-radius: 4px;
}

.tn-user-picture_s.tn-user-picture_square,
.tn-user-picture_square.tn-user-picture_s .tn-user-picture__container {
  border-radius: 2px;
}

.tn-user-picture_l.tn-user-picture_square,
.tn-user-picture_square.tn-user-picture_l .tn-user-picture__container {
  border-radius: 8px;
}

.tn-user-picture__image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tn-user-picture__text {
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tn-user-picture_s .tn-user-picture__text {
  font-size: 12px;
  line-height: 16px;
}

.tn-user-picture_l .tn-user-picture__text {
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
}

.tn-user-picture__icon,
.tn-user-picture__span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
}

.tn-user-picture__span {
  text-transform: uppercase;
}

.tn-user-picture_l .tn-user-picture__span {
  font-size: 16px;
  font-weight: 700;
}

.tn-user-picture .tn-user-picture__span {
  font-size: 14px;
  font-weight: 700;
}

.tn-user-picture_s .tn-user-picture__span {
  font-size: 12px;
  font-weight: 700;
}
.tn-user-picture__status {
  width: 6px;
  height: 6px;
  background-color: #667387;
  outline: 2px solid #66738733;
  border-radius: 50%;
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
}

.tn-user-picture_s .tn-user-picture__status {
  width: 4px;
  height: 4px;
  top: 0;
  right: 0;
  outline-width: 1.5px;
}

.tn-user-picture_l .tn-user-picture__status {
  width: 8px;
  height: 8px;
  top: 0px;
  right: 0px;
  outline-width: 2.5px;
}

.tn-user-picture__status_enabled {
  background-color: #009c37;
  outline: 2px solid #00842f33;
}
</style>
