import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
