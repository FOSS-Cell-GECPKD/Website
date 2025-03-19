import { createRouter, createWebHistory } from "vue-router";
import HeroView from "../views/HeroView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HeroView,
    },
  ],
});

export default router;
