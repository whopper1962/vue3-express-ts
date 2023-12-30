<template>
  <div class="bg-gray-800 h-screen justify-center w-full">
    <NavigationBar v-if="authInfo" />
    <router-view></router-view>
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from "@/components/NavigationBar.vue";
import { ModalsContainer } from "vue-final-modal";
import { useAuthStore } from "@/stores/auth";
import { toRefs } from "vue";

const authStore = useAuthStore();
const { authInfo } = toRefs(authStore);
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
