<template>
  <div role="button" aria-label="switch mode" class="cursor-pointer" @click="toggleMode">
    <div :class="icon" class="text-5.5 text-default dark:text-darkdefault transition-500"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useToggle } from "@vueuse/core";
import { isDark } from "@/composables/dark";

const icon = computed(() => isDark.value ? "i-ri:moon-line" : "i-ri:sun-line");
const toggle = useToggle(isDark);
const toggleMode = () => {
  toggle();
};
</script>
