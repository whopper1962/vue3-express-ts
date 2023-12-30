import { useToast, POSITION, TYPE } from "vue-toastification";
import { CommonOptions } from "vue-toastification/dist/types/types";

const TIMEOUT = 3000;
const PAUSE_ON_HOVER = false;
const CLOSE_BUTTON = false;
const toast = useToast();

export const useToastHelper = () => {
  const showErrorToast = (
    toastMessage: string = "An error occured while processing your request.",
    options?: CommonOptions,
  ): void => {
    const defaultOptions = {
      type: TYPE.ERROR,
      position: POSITION.TOP_RIGHT,
      timeout: TIMEOUT,
      pauseOnHover: PAUSE_ON_HOVER,
      closeButton: CLOSE_BUTTON,
    };

    toast(toastMessage, Object.assign(defaultOptions, options));
  };
  const showSuccessToast = (
    toastMessage: string = "Success!",
    options?: CommonOptions,
  ): void => {
    const defaultOptions = {
      type: TYPE.SUCCESS,
      position: POSITION.TOP_RIGHT,
      timeout: TIMEOUT,
      pauseOnHover: PAUSE_ON_HOVER,
      closeButton: CLOSE_BUTTON,
    };
    toast(toastMessage, Object.assign(defaultOptions, options));
  };
  return {
    showErrorToast,
    showSuccessToast,
  };
};
