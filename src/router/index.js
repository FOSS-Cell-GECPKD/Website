import { createRouter, createWebHistory } from "vue-router";
import HeroView from "../views/HeroView.vue";
import MakersView from "../views/Makers.vue";
import BreakpointView from "../views/Breakpoint.vue";
import BlogList from "../views/BlogList.vue";
import BlogPost from "../views/BlogPost.vue";

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
    {
      path: "/blog",
      name: "Blog",
      component: BlogList,
    },
    {
      path: "/blog/:slug",
      name: "BlogPost",
      component: BlogPost,
    },
  ],
});

export default router;
