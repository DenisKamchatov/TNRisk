import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import tnIconPack from "./components/uikit/icons";

import Main from "./views/main/Main.vue";
import UikitPage from "./views/uikit/uikit-page.vue";
import UikitDialogPage from "./views/uikit/dialogs/dialogs-page.vue";
import {
  vTooltip,
  vClosePopper,
} from 'floating-vue';

import { createRouter, createWebHistory } from "vue-router";

const routes: any[] = [
  { path: "/", component: Main, name: "MainPage" },
  { path: "/uikit", component: UikitPage, name: "UikitPage" },
  {
    path: "/uikit-dialog",
    component: UikitDialogPage,
    name: "UikitDialogPage",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(tnIconPack);

app.directive("tooltip", vTooltip);
app.directive("close-popper", vClosePopper);

app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

app.mount("#app");
