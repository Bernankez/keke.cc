<template>
  <Header :show-grant="compatible && (!isGranted && !isDenied)" @grant="grant" />
  <main class="w-full min-h-full">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { colorPrimaryRed as colorPrimary } from "@bernankez/theme";
import { uesOrientationShadow } from "./composables/orientation-shadow";
import Header from "@/layout/Header.vue";

const { compatible, grant, isGranted, isDenied } = uesOrientationShadow();
</script>

<style scoped>
:global(::selection) {
  background-color: v-bind("colorPrimary.DEFAULT");
}
</style>
