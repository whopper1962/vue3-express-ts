<template>
  <section class="bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="flex items-center mb-6 text-4xl font-semibold text-white font-rubik"
      >
        <img class="w-12 h-12 mr-2" src="/images/app-icon.png" alt="logo" />
        IF Wizard
      </div>
      <div
        class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold text-center leading-tight tracking-tight md:text-2xl text-white"
          >
            Create your account
          </h1>
          <form class="space-y-4 md:space-y-6 pt-3" @submit.prevent="signUp()">
            <div class="flex flex-col space-y-4 items-center h-[90px]">
              <div class="relative w-24">
                <div class="aspect-w-1 aspect-h-1">
                  <img
                    class="rounded-full w-24 h-24 absolute object-cover"
                    :src="inputtedProfileImage || '/images/user-icon.png'"
                    alt="image description"
                  />
                </div>
                <div
                  class="w-24 h-24 group hover:bg-black opacity-50 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500"
                  @click="openFilePicker()"
                >
                  <font-awesome-icon
                    :icon="['fas', 'arrow-up-from-bracket']"
                    class="hidden group-hover:flex h-[30px] text-white transition duration-500"
                  />
                </div>
                <input
                  type="file"
                  ref="fileInputRef"
                  style="display: none"
                  accept="image/png, image/jpeg"
                  @change="handleFileSelect"
                />
              </div>
            </div>
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medissum text-white"
                >Username</label
              >
              <input
                type="text"
                name="username"
                id="username"
                class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="whopper"
                v-model="inputtedUsername"
                required
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-white"
                >Email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="whopper@example.com"
                v-model="inputtedEmail"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                autocomplete="false"
                v-model="inputtedPassword"
                required
              />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-white"
                >Confirm password</label
              >
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                autocomplete="false"
                v-model="inputtedPasswordConfirmation"
                required
              />
              <p
                id="filled_error_help"
                class="mt-2 text-xs text-red-400"
                v-if="isPasswordMismatched"
              >
                Please make sure your passwords match.
              </p>
            </div>
            <button
              type="submit"
              class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Sign up
            </button>
            <p class="text-sm font-light text-gray-400">
              Already have an account?
              <router-link
                class="font-medium text-primary-600 hover:underline text-primary-500"
                :to="{ name: 'SignIn' }"
                >Sign in here</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { axios } from "@/libs/axios";
import { ref, watch } from "vue";
import { useToastHelper } from "@/helpers/toast";
import { useCookieHelper, Cookies } from "@/helpers/cookie";
import { useRouter } from "vue-router";
import { NewUser } from "@/types";

const router = useRouter();

const inputtedUsername = ref<string>("");
const inputtedEmail = ref<string>("");
const inputtedPassword = ref<string>("");
const inputtedPasswordConfirmation = ref<string>("");
const inputtedProfileImage = ref<string>("");

const { getCookieValue } = useCookieHelper();
const { showErrorToast, showSuccessToast } = useToastHelper();

const isPasswordMismatched = ref<boolean>(false);

const isSubmitting = ref(false);

watch(inputtedPasswordConfirmation, () => (isPasswordMismatched.value = false));

const signUp = async (): Promise<void> => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  isPasswordMismatched.value =
    inputtedPasswordConfirmation.value !== inputtedPassword.value;
  if (isPasswordMismatched.value) return;

  try {
    await axios.post<void, NewUser>("/signup", {
      name: inputtedUsername.value,
      email: inputtedEmail.value,
      password: inputtedPassword.value,
      profileImage: inputtedProfileImage.value,
    });
    showSuccessToast(
      "We have sent a verification email.\nPlease complete the account creation by following the link provided in the email.",
      {
        timeout: 20000,
      },
    );
    router.push({ name: "SignIn" });
  } catch {
    showErrorToast("Sign up failed.");
  } finally {
    isSubmitting.value = false;
  }
};

const redirectIfSignedIn = () => {
  if (!getCookieValue(Cookies.USER_ID)) return;
  router.push({
    name: "HomeView",
  });
};

const fileInputRef = ref<HTMLInputElement | null>(null);

const openFilePicker = () => {
  fileInputRef.value?.click();
};

const handleFileSelect = (event: Event) => {
  const selectedFile = (event.target as HTMLInputElement).files?.[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result as string;
      inputtedProfileImage.value = base64Data;
    };

    reader.readAsDataURL(selectedFile);
  }
};

redirectIfSignedIn();
</script>

<style scoped></style>
