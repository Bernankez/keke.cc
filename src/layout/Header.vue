<template>
  <div
    class="absolute top-0 left-0 flex items-center justify-between w-full h-18 lg:backdrop-saturate-50 lg:backdrop-blur-8 bg-opacity-70 dark:bg-opacity-70 bg-transparent p-x-5 box-border"
  >
    <div></div>
    <Switch v-model="isDark">
      <template #checked>
        <div class="i-ri:moon-line"></div>
      </template>
      <template #unchecked>
        <div class="i-ri:sun-line"></div>
      </template>
    </Switch>
  </div>
</template>

<script setup lang="ts">
import { useDark } from "@vueuse/core";
import Switch from "@/components/Switch.vue";

const isDark = $(useDark());
</script>

<style lang="scss" scoped>

</style>
