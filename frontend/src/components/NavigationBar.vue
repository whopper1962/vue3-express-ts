<template>
  <nav class="border-gray-200 bg-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <router-link
        :to="{
          name: 'Home',
        }"
        class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
      >
        <img src="/images/app-icon.png" class="h-8" alt="Flowbite Logo" />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap text-white font-rubik"
          >IF Wizard</span
        >
      </router-link>
      <div
        class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
      >
        <button
          type="button"
          class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span class="sr-only">Open user menu</span>
          <div class="aspect-w-1 aspect-h-1">
            <img
              class="w-10 h-10 rounded-full object-cover"
              :src="authInfo?.profileImage || '/images/user-icon.png'"
              alt="user photo"
            />
          </div>
        </button>
        <div
          class="z-50 hidden my-4 text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600"
          id="user-dropdown"
        >
          <div class="px-4 py-3">
            <span class="block text-sm text-white">{{
              authInfo?.userName
            }}</span>
            <span class="block text-sm text-gray-400 truncate">{{
              authInfo?.email
            }}</span>
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <button
                @click="execSignout()"
                class="block px-4 w-full py-2 text-sm text-left hover:bg-gray-600 text-gray-200"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-user"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-user"
      >
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700"
        >
          <li>
            <router-link
              :to="{
                name: 'Home',
              }"
              class="block py-2 px-3 rounded md:p-0 md:hover:text-gray-200 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              :class="isActiveRotue('Home') ? 'text-gray-200' : 'text-gray-400'"
              >Menu 1</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                name: 'Home',
              }"
              class="block py-2 px-3 rounded md:p-0 md:hover:text-gray-200 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              :class="isActiveRotue('Home') ? 'text-gray-200' : 'text-gray-400'"
              >Menu 2</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { initFlowbite } from "flowbite";
import { computed, onMounted, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useToastHelper } from "@/helpers/toast";
import { useCookieHelper, Cookies } from "@/helpers/cookie";

const authStore = useAuthStore();
const { resetAuthInfo } = authStore;
const { authInfo } = toRefs(authStore);

const route = useRoute();
const router = useRouter();

const { removeCookie } = useCookieHelper();
const { showErrorToast, showSuccessToast } = useToastHelper();

const isActiveRotue = computed(() => (name: string) => name === route.name);

const execSignout = () => {
  try {
    resetAuthInfo();
    removeCookie(Cookies.USER_ID);
    router.push({ name: "SignIn" });
    showSuccessToast("Successfully signed out!");
  } catch {
    showErrorToast("Sign out failed.");
  }
};

onMounted(() => {
  initFlowbite();
});
</script>

<style lang="scss" scoped></style>
