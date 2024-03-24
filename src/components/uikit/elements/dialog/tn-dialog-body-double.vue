<script setup lang="ts"></script>

<template>
  <div class="tn-dialog-body-double">
    <div class="tn-dialog-body-double__col-1">
      <div class="tn-dialog-body-double__header" v-if="$slots.header">
        <slot name="header"></slot>
      </div>
      <div class="tn-dialog-body-double__content scrollbox">
        <slot name="body"></slot>
      </div>
    </div>

    <div class="tn-dialog-body-double__col-2">
      <div class="tn-dialog-body-double__header" v-if="$slots.secondHeader">
        <slot name="secondHeader"></slot>
      </div>
      <div class="tn-dialog-body-double__content scrollbox">
        <slot name="secondBody"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tn-dialog-body-double {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  height: 100%;

}
.tn-dialog-body-double__col-1 {
  border-right: var(--dialog-body-header-border-right);
}

.tn-dialog-body-double__col-1,
.tn-dialog-body-double__col-2 {
  position: relative;
  display: flex;
  flex-direction: column;

  overflow-y: auto;
}

.tn-dialog-body-double__header {
  position: relative;
  width: 100%;
  padding: 8px 24px;

  border-bottom: var(--dialog-body-header-border-bottom);
  background-color: var(--dialog-body-header-bg);
  z-index: 1;
}

.tn-dialog-body-double__content {
  overflow-y: auto;
  padding: 24px;
}
</style>
