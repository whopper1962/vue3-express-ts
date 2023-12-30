import { AxiosError } from "axios";
import { useToastHelper } from "@/helpers/toast";
import { router } from "@/router";
import { SESSION_EXPIRED } from "@/libs/axios";
import { useAuthStore } from "@/stores/auth";
import { useCookieHelper, Cookies } from "@/helpers/cookie";

const { showErrorToast } = useToastHelper();
const { removeCookie } = useCookieHelper();

export const onErrorResponse = (
  error: AxiosError | Error,
): Promise<AxiosError> => {
  const authStore = useAuthStore();

  if (import.meta.env.MODE === "development") {
    console.error(error);
  }

  if ((error as AxiosError).response!.status === 401) {
    showErrorToast("Authentication error occurred. Please log in.", {
      timeout: 5000,
    });
    removeCookie(Cookies.USER_ID);
    router.push({
      name: "SignIn",
    });
    authStore.reset();
    return Promise.reject(SESSION_EXPIRED);
  } else {
    return Promise.reject(error);
  }
};
