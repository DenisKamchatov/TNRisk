import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import tnIconPack from './components/uikit/icons'

import Main from "./views/main/Main.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes: any[] = [
  { path: "/", component: Main, name: "MainPage" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).use(tnIconPack).mount("#app");
