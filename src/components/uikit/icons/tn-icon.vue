<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TNIcon",

  props: {
    /** @var name Название иконки */
    name: { type: String },
    /** @var intext Для размещения иконок в тексте */
    intext: { type: Boolean },
    /** @var fill Цвет заполнения иконки */
    fill: { type: String },
    /** @deprecated */
    size: { type: Number, default: 0 },
    /** @deprecated */
    width: { type: Number, default: 0 },
    /** @deprecated */
    height: { type: Number, default: 0 },
  },

  computed: {
    svgWidth(): number {
      return +this.width > 0 ? this.width : +this.size > 0 ? this.size : 24;
    },
    svgHeight(): number {
      return +this.height > 0 ? this.height : +this.size > 0 ? this.size : 24;
    },
  },
});
</script>

<template>
  <i
    class="tn-icon"
    :class="{
      'tn-icon_intext': intext,
    }"
  >
    <svg
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      xmlns="http://www.w3.org/2000/svg"
      :fill="fill ? fill : 'none'"
    >
      <use :xlink:href="`#icon--${name}`" />
    </svg>
  </i>
</template>

<style>
.tn-icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 1em;
  height: 1em;
}

.tn-icon svg {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  pointer-events: none;
}

.tn-icon_intext {
  font-size: 1.4em;
}
</style>
