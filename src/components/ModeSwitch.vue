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

const toggleMode = (event: MouseEvent) => {
  if ("startViewTransition" in document) {
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    const viewTransition = (document as any).startViewTransition(() => {
      toggle();
      const html = document.querySelector("html");
      if (html) {
        html.classList.remove(isDark.value ? "dark" : "light");
        html.classList.add(isDark.value ? "light" : "dark");
      }
    });

    viewTransition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: isDark.value ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 500,
          easing: "ease-in",
          pseudoElement: isDark.value ? "::view-transition-new(root)" : "::view-transition-old(root)",
        },
      );
    });
  } else {
    toggle();
  }
};
</script>
