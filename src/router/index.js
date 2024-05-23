import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/blog/:CategorySlug?",
      name: "blog",
      component: () => import("../views/BlogView.vue"),
      props: true,
    },
    {
      path: "/videos/:CategorySlug?",
      name: "videos",
      component: () => import("../views/YoutubeView.vue"),
      props: true,
    },
    {
      path: "/portfolio/:slug?",
      name: "portfolio",
      component: () => import("../views/PortfolioView.vue"),
    },
    {
      path: '/blog/:categorySlug/:slug',
      name: 'ArticlePage',
      component: () => import("../views/ArticlePage.vue"),
      props: true 
    },
    {
    path: '/videos/:categoySlug/:slug',
    name: 'videoPage',
    component: () => import("../views/videoPage.vue"),
    props: true 
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/mentions-legales",
      name: "mentions-legales",
      component: () => import("../views/MentionsLegales.vue"),
    },
    {
      path: "/tests",
      name: "tests",
      component: () => import("../views/Tests.vue"),
    },
    {
      // Route pour les URL inexistantes
      path: "/:catchAll(.*)", // Utilisation de :catchAll pour capturer toutes les URL
      name: "NotFound",
      component: () => import("../components/NotFound.vue"),
    },
  ],
});

export default router;