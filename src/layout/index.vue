<template>
  <Header />
  <main class="grid min-h-full w-full">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { colorPrimaryRed as colorPrimary } from "@bernankez/theme";
import Header from "./Header.vue";
</script>

<style scoped>
:global(::selection) {
  background-color: v-bind("colorPrimary.DEFAULT");
}
</style>
