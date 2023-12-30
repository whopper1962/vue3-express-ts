import { Cookies, useCookieHelper } from "@/helpers/cookie";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("@/views/SignIn.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: {
      name: "Home",
    },
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _from, next): Promise<void> => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const { getCookieValue, removeCookie } = useCookieHelper();
    const authStore = useAuthStore();
    const { fetchAuthInfo, resetAuthInfo } = authStore;

    if (!getCookieValue(Cookies.USER_ID)) {
      resetAuthInfo();
      removeCookie(Cookies.USER_ID);
      next({ name: "SignIn" });
    } else {
      await fetchAuthInfo();
      next();
    }
  } else {
    next();
  }
});
