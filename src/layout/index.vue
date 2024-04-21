<script setup lang="ts">
import { colorPrimaryRed as colorPrimary } from "@bernankez/theme";
import Header from "./Header.vue";
</script>

<template>
  <!-- <Background /> -->
  <Header />
  <main class="grid box-border min-h-full w-full p-t-18">
    <RouterView />
  </main>
</template>

<style scoped>
:global(::selection) {
  background-color: v-bind("colorPrimary.DEFAULT");
}
</style>
