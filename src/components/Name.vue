<template>
  <div class="name">
    {{ names.join("") }}
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const { name = "科科Cole", duration = 500, cursorDuration = 1500, immediate = false, fontSize = 50 } = defineProps<{
  name?: string;
  duration?: number;
  cursorDuration?: number;
  immediate?: boolean;
  fontSize?: string | number;
}>();

const computedCursorDuration = $computed(() => {
  if (names.length < name.length) {
    return "0";
  }
  return `${cursorDuration / 1000}s`;
});

const computedFontSize = $computed(() => {
  if (typeof fontSize === "number") {
    return `${fontSize}px`;
  }
  return fontSize;
});

let names = $ref<string[]>([]);

function play() {
  names = [];
  const splitName = name.split("");
  let timer: number | undefined;

  function update() {
    names.push(splitName.shift()!);
  }

  if (immediate && splitName.length > 0) {
    update();
  }
  timer = window.setInterval(() => {
    if (splitName.length > 0) {
      update();
    } else {
      clearInterval(timer);
      timer = undefined;
    }
  }, duration);
}

onMounted(() => {
  play();
});
</script>

<style scoped>
.name {
  @apply relative w-fit text-default dark-text-darkdefault;
  font-size: v-bind("computedFontSize");
}

.name::after {
  @apply absolute left-full h-full w-0.1em rounded-3px bg-default dark-bg-darkdefault;
  content: "";
  animation: flash v-bind("computedCursorDuration") infinite;
}

@keyframes flash {
  50% {
    opacity: 0;
  }
}
</style>
