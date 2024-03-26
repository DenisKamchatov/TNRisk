import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import tnIconPack from "./components/uikit/elements/icons";

import Main from "./views/main/Main.vue";
import UikitPage from "./views/uikit/uikit-page.vue";
import UikitDialogPage from "./views/uikit/dialogs/dialogs-page.vue";
import FloatingVue from 'floating-vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

import { createRouter, createWebHistory } from "vue-router";

const routes: any[] = [
  { path: "/", component: Main, name: "MainPage" },
  { path: "/uikit", component: UikitPage, name: "UikitPage" },
  {
    path: "/uikit-dialog",
    component: UikitDialogPage,
    name: "UikitDialogPage",
  },
  {
    path: "/uikit-icons",
    component: import("@/views/uikit/icon-set/icon-set.vue"),
    name: "UikitIconsPage",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(tnIconPack);

app.use(FloatingVue, {
  themes: {
    'notifications': {
      $extend: 'dropdown',
    },
  },
});

app.use(autoAnimatePlugin);

app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

app.mount("#app");
