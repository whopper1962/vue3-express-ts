<template>
  <section class="bg-gray-800">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[800px] lg:py-0"
    >
      <button
        type="button"
        class="text-white w-28 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="showDialog()"
      >
        Open
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { axios } from "@/libs/axios";
import { useModalHelper } from "@/helpers/modal";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { useToastHelper } from "@/helpers/toast";
import { User } from "@/types";

const { openModal } = useModalHelper();
const { showErrorToast } = useToastHelper();

const showDialog = () => {
  openModal(ConfirmationModal, {
    buttonText: "Fetch users",
    onConfirm: fetchUsers,
  });
};

const fetchUsers = async (): Promise<void> => {
  try {
    const data = await axios.get<User>("/users");
    console.log("Fetched users:", data);
  } catch {
    showErrorToast("An error occurred.");
  }
};
</script>

<style scoped></style>
