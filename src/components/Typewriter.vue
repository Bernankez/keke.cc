<template>
  <div>
    <div
      ref="hiddenName"
      class="hidden name relative w-fit text-6 lg:text-12.5 text-default dark-text-darkdefault leading-none transition"
    >
      {{ name }}
    </div>
    <div class="name relative w-fit text-6 lg:text-12.5 text-default dark-text-darkdefault leading-none transition">
      {{ names.join("") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useHiddenElementStyle } from "@/composables/dom";

const { name = "科科Cole", duration = 400, cursorDuration = 1500 } = defineProps<{
  name?: string;
  duration?: number;
  cursorDuration?: number;
  immediate?: boolean;
}>();

const emit = defineEmits<{
  (event: "loaded", style: CSSStyleDeclaration): void;
}>();

const hiddenName = $ref<HTMLDivElement>();
const { style } = $(useHiddenElementStyle($$(hiddenName)));
watch(() => style, (style) => {
  if (style) {
    emit("loaded", style);
  }
});

const computedCursorDuration = $computed(() => {
  if (names.length < name.length) {
    return "0";
  }
  return `${cursorDuration / 1000}s`;
});

let names = $ref<string[]>([]);

function play() {
  names = [];
  const splitName = name.split("");
  let timer: number | undefined;

  function update() {
    names.push(splitName.shift()!);
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
.name::after {
  @apply b-r-0.1em b-default dark-b-darkdefault rounded-3px;
  content: "";
  animation: flash v-bind("computedCursorDuration") infinite;
}

@keyframes flash {
  50% {
    opacity: 0;
  }
}
</style>
