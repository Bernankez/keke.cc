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

    const ratioX = (100 * x) / innerWidth;
    const ratioY = (100 * y) / innerHeight;
    const referR = Math.hypot(innerWidth, innerHeight) / Math.SQRT2;
    const ratioR = (100 * endRadius) / referR;

    const transition = document.startViewTransition(async () => {
      resolve(true);
      await nextTick();
    });
    transition.ready.then(() => {
      const clipPath = [
        `circle(0% at ${ratioX}% ${ratioY}%)`,
        `circle(${ratioR}% at ${ratioX}% ${ratioY}%)`,
      ];
      console.log(clipPath);
      document.documentElement.animate(
        {
          clipPath,
        },
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
