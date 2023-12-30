<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <slot />
    <button v-if="!props.hideConfirmButton" @click="onSubmit()">
      {{ props.buttonText }}
    </button>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

type Props = {
  hideConfirmButton?: boolean;
  buttonText?: string;
  onSubmit?: any;
};

type Emits = {
  (e: "confirm"): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const onSubmit = async () => {
  try {
    if (props.onSubmit) {
      await props.onSubmit();
    }
    emits("confirm");
  } catch {}
};
</script>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 40px;
}
.confirm-modal-content > * + * {
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}
.confirm-modal-content button {
  margin: 30px auto 0 auto;
  display: inline-block;
  text-align: center;
  padding: 0.6rem;
  border-radius: 5px;
  line-height: 1;
  color: #006bad;
  background: #fff;
  border: 2px solid #006bad;
}
.dark .confirm-modal-content {
  background: #000;
}
</style>
