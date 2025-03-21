import { createRouter, createWebHistory } from "vue-router";
import HeroView from "../views/HeroView.vue";
import MakersView from "../views/Makers.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HeroView,
    },
    {
      path: "/makers",
      name: "makers",
      component: MakersView,
    },
  ],
});

export default router;
