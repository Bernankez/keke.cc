<script setup lang="ts">
const props = withDefaults(defineProps<{
  name?: string;
  duration?: number;
  cursorDuration?: number;
}>(), {
  name: "科科Cole",
  duration: 400,
  cursorDuration: 1500,
});

const emit = defineEmits<{
  loaded: [style: Record<keyof CSSStyleDeclaration, string>];
}>();

const { name, cursorDuration, duration } = toRefs(props);

const hiddenName = ref<HTMLDivElement>();
const { style } = useHiddenElementStyle(hiddenName);
watch(style, (style) => {
  if (style) {
    emit("loaded", style);
  }
});

const names = ref<string[]>([]);

const computedCursorDuration = computed(() => {
  if (names.value.length < name.value.length) {
    return "0";
  }
  return `${cursorDuration.value / 1000}s`;
});

function play() {
  names.value = [];
  const splitName = name.value.split("");
  let timer: number | undefined;

  function update() {
    names.value.push(splitName.shift()!);
  }

  timer = window.setInterval(() => {
    if (splitName.length > 0) {
      update();
    } else {
      clearInterval(timer);
      timer = undefined;
    }
  }, duration.value);
}

onMounted(() => {
  play();
});
</script>

<template>
  <div>
    <div
      ref="hiddenName"
      class="name relative hidden w-fit leading-none text-default transition dark-text-darkdefault"
    >
      {{ name }}
    </div>
    <div class="name relative w-fit leading-none text-default transition dark-text-darkdefault">
      {{ names.join("") }}
    </div>
  </div>
</template>

<style scoped>
.name::after {
  @apply b-r-0.1em b-r-solid b-default dark-b-darkdefault rounded-3px;

  animation: flash v-bind("computedCursorDuration") infinite;
  content: "";
}

@keyframes flash {
  50% {
    opacity: 0;
  }
}
</style>
