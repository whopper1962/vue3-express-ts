import { useModal } from "vue-final-modal";

export const useModalHelper = () => {
  const openModal = (
    modalComponent: any,
    options: {
      hideConfirmButton?: boolean;
      buttonText?: string;
      onConfirm?: any;
    },
  ) => {
    const { open, close } = useModal({
      component: modalComponent,
      attrs: {
        hideConfirmButton: options?.hideConfirmButton,
        buttonText: options?.buttonText || "Submit",
        async onConfirm() {
          if (options?.onConfirm) options.onConfirm();
          close();
        },
      },
    });
    open();
  };

  return { openModal };
};
