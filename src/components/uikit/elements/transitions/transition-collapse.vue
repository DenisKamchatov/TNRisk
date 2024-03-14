<template>
  <transition
    enter-active-class="enter-active"
    leave-active-class="leave-active"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TransitionCollapse",
  methods: {
    beforeEnter(element: HTMLElement) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = "0px";
        }

        element.style.display = "";
      });
    },
    enter(element: HTMLElement) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = `${element.scrollHeight}px`;
        });
      });
    },
    afterEnter(element: HTMLElement) {
      element.style.height = "";
    },
    beforeLeave(element: HTMLElement) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = `${element.offsetHeight}px`;
        }
      });
    },
    leave(element: HTMLElement) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = "0px";
        });
      });
    },
    afterLeave(element: HTMLElement) {
      element.style.height = "";
    }
  }
});
</script>

<style scoped>
.enter-active,
.leave-active {
  overflow: hidden;
  transition: all 0.3s ease;
}
</style>
