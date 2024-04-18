<script setup lang="ts">
const icon = computed(() => isDark.value ? "i-ri:moon-line" : "i-ri:sun-line");
const toggle = useToggle(isDark);

function toggleMode(event: MouseEvent) {
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
          clipPath,
        },
        {
          duration: 500,
          easing: "cubic-bezier(.16,.08,.25,1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  } else {
    toggle();
  }
}
</script>

<template>
  <Icon :icon="icon" title="Toggle Color Scheme" @click="toggleMode" />
</template>
