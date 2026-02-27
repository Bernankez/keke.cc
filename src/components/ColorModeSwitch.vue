<script setup lang="ts">
const icon = computed(() => isDark.value ? "i-ri:moon-line" : "i-ri:sun-line");
const toggle = useToggle(isDark);
const prefersReducedMotion = usePreferredReducedMotion();

function beforeToggle(event: MouseEvent) {
  return new Promise((resolve) => {
  // @ts-expect-error startViewTransition
    const isAppearanceTransition = document.startViewTransition && prefersReducedMotion.value === "no-preference";
    if (!isAppearanceTransition) {
      resolve(true);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    const blurPx = 456;

    const transition = document.startViewTransition(async () => {
      resolve(true);
      await nextTick();
    });
    transition.ready.then(() => {
      const el = document.documentElement;
      el.style.setProperty("--vt-x", `${x}px`);
      el.style.setProperty("--vt-y", `${y}px`);
      el.style.setProperty("--vt-blur", `${blurPx}px`);

      el.animate(
        { "--vt-radius": [`0px`, `${endRadius + blurPx}px`] },
        {
          duration: 500,
          easing: "cubic-bezier(.16,.08,.25,1)",
          fill: "both",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  });
}

async function toggleMode(event: MouseEvent) {
  await beforeToggle(event);
  toggle();
}
</script>

<template>
  <Icon :icon="icon" title="Toggle Color Scheme" @click="toggleMode" />
</template>
