<script setup lang="ts">
import type { TeleportProps } from "vue";

const props = withDefaults(defineProps<{
  show?: boolean;
  to?: TeleportProps["to"];
  transition?: boolean;
  lockScroll?: boolean;
  class?: any;
  wrapperClass?: any;
}>(), {
  transition: true,
  lockScroll: true,
});

const emit = defineEmits<{
  click: [e: MouseEvent];
}>();

const { lockScroll, show } = toRefs(props);
const isLocked = computed(() => lockScroll.value && show.value);
const { markUnlock, unlock, lock } = useLockHtmlScroll(isLocked, { manual: true });

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();

const zIndex = ref(0);
const { use, release, nextZIndex } = useZIndex();
watch(show, (show) => {
  if (show) {
    zIndex.value = use(nextZIndex.value);
  } else {
    release(zIndex.value);
  }
}, {
  immediate: true,
});

watch(show, (show) => {
  if (show) {
    lock?.();
  } else {
    markUnlock?.();
    if (!props.transition) {
      unlock?.();
    }
  }
});
</script>

<template>
  <DefineTemplate>
    <div v-if="show" :class="[props.wrapperClass]" :style="{ zIndex }" class="fixed bottom-0 left-0 right-0 top-0 flex overflow-y-auto bg-darkbackground bg-opacity-50 backdrop-blur-20 backdrop-saturate-50 transition-300" @click="emit('click', $event)">
      <div :class="[props.class]" class="relative left-50% top-50% h-fit max-h-full w-fit -translate-x-50% -translate-y-50%" @click.stop>
        <slot></slot>
      </div>
    </div>
  </DefineTemplate>
  <Teleport :to="to">
    <ReuseTemplate v-if="!props.transition" />
    <Transition v-else name="mask" @after-leave="() => unlock?.()">
      <ReuseTemplate />
    </Transition>
  </Teleport>
</template>

<style scoped>
.mask-enter-from,
.mask-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
