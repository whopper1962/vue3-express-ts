<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="flex items-center mb-6 text-4xl font-semibold text-white font-rubik"
      >
        <img class="w-12 mr-2" src="/images/app-icon.png" alt="logo" />
        IF Wizard
      </div>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold text-center leading-tight tracking-tight md:text-2xl text-white"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="signIn()">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your email"
                v-model="inputtedEmail"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                autocomplete="false"
                v-model="inputtedPassword"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              You don't' have an account?
              <router-link
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                :to="{ name: 'SignUp' }"
                >Sign up here</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useToastHelper } from "@/helpers/toast";
import { useCookieHelper, Cookies } from "@/helpers/cookie";
import { axios } from "@/libs/axios";
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { SignInInfo } from "@/types";

const inputtedEmail = ref<string>("");
const inputtedPassword = ref<string>("");

const { showErrorToast, showSuccessToast } = useToastHelper();
const { setCookie, getCookieValue } = useCookieHelper();

const authStore = useAuthStore();
const { fetchAuthInfo } = authStore;
const { authInfo } = toRefs(authStore);

const router = useRouter();

const isSubmitting = ref(false);

const signIn = async (): Promise<void> => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    const data = await axios.post<string, SignInInfo>("/signin", {
      email: inputtedEmail.value,
      password: inputtedPassword.value,
    });
    setCookie(Cookies.USER_ID, data, 7200000);
    await fetchAuthInfo();
    showSuccessToast(`Hello, ${authInfo.value?.userName}!`);
    router.push({ name: "Home" });
  } catch {
    showErrorToast("Sign in failed!");
  } finally {
    isSubmitting.value = false;
  }
};

const redirectIfSignedIn = () => {
  if (!getCookieValue(Cookies.USER_ID)) return;
  router.push({
    name: "Home",
  });
};

redirectIfSignedIn();
</script>

<style scoped></style>
