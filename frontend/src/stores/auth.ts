import { ref } from "vue";
import { defineStore } from "pinia";
import { axios } from "@/libs/axios";
import { AuthInfo } from "@/types";

export const useAuthStore = defineStore("authStore", () => {
  const authInfo = ref<AuthInfo>();

  const fetchAuthInfo = async (): Promise<void> => {
    const data = await axios.get<AuthInfo>("/auth-info");
    authInfo.value = data;
  };

  const resetAuthInfo = (): void => {
    authInfo.value = undefined;
  };

  return {
    authInfo,
    fetchAuthInfo,
    resetAuthInfo,
  };
});
