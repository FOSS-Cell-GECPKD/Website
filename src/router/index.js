import { createRouter, createWebHistory } from "vue-router";
import HeroView from "../views/HeroView.vue";
import MakersView from "../views/Makers.vue";
import BreakpointView from "../views/Breakpoint.vue";

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
    {
      path: "/breakpoint",
      name: "breakpoint",
      component: BreakpointView,
    },
  ],
});

export default router;
