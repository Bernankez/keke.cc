<script setup lang="ts">
import type { Placement, Side, Strategy } from "@floating-ui/vue";
import type { Fn } from "@vueuse/core";
import type { StyleValue } from "vue";
import { createSlot } from "@/utils/vue";
import { useMergedState } from "@bernankez/utils/vue";
import { arrow, autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/vue";
import { noop } from "@vueuse/core";

const props = withDefaults(defineProps<{
  trigger?: "click" | "hover" | "focus" | "manual";
  arrow?: boolean;
  delay?: number;
  placement?: Placement;
  strategy?: Strategy;
  disabled?: boolean;
  offset?: boolean;
  flip?: boolean;
  shift?: boolean;
  autoUpdate?: boolean;
  teleport?: boolean;
  content?: string;
  defaultValue?: boolean;
  modelValue?: boolean;
  animationDuration?: number;
  style?: StyleValue; // content wrapper style
  class?: any; // content wrapper class
}>(), {
  trigger: "hover",
  arrow: false,
  delay: 0,
  placement: "top",
  strategy: "absolute",
  disabled: false,
  offset: true,
  flip: true,
  shift: true,
  autoUpdate: true,
  teleport: false,
  content: "",
  defaultValue: false,
  modelValue: undefined,
  animationDuration: 0,
  style: () => ({}),
  class: "",
});

const emit = defineEmits<{
  (event: "update:modelValue", show: boolean): void;
}>();

const { define: DefineTemplate, reuse: ReuseTemplate } = createReusableTemplate();

// get slot dom
const slots = useSlots();
const { CustomSlot, slotRef: referenceRef } = createSlot(slots.default, "default");
defineExpose({
  slotRef: referenceRef,
});

const floatingRef = ref<HTMLDivElement>();
const arrowRef = ref<HTMLDivElement>();

// handle show/hide
const uncontrolledModelValue = ref(props.defaultValue);
const controlledModelValue = toRef(props, "modelValue");
const mergedModelValue = useMergedState(controlledModelValue, uncontrolledModelValue);
function showContent(show: boolean) {
  emit("update:modelValue", show);
  uncontrolledModelValue.value = show;
}
const canceled = ref(false);
const debouncedOpenContent = ref<Fn>();
function openContent() {
  canceled.value = false;
  debouncedOpenContent.value?.();
}
function closeContent() {
  canceled.value = true;
  showContent(false);
}
watch(() => props.delay, (delay) => {
  if (delay === 0) {
    debouncedOpenContent.value = () => showContent(true);
  } else {
    debouncedOpenContent.value = useDebounceFn(() => {
      if (canceled.value) {
        canceled.value = false;
        return;
      }
      showContent(true);
    }, delay);
  }
}, {
  immediate: true,
});
const { dispose, triggerListener } = useFloatingTrigger(referenceRef, {
  openContent,
  closeContent,
  isOpened: mergedModelValue,
});
watch([() => props.trigger, () => props.disabled], ([trigger, disabled]) => {
  dispose();
  if (disabled) {
    return;
  }
  triggerListener(trigger);
}, { immediate: true });

const middleware = computed(() => {
  const arr = [];
  if (props.offset) {
    arr.push(offset(props.arrow ? 6 : 3));
  }
  if (props.flip) {
    arr.push(flip());
  }
  if (props.shift) {
    arr.push(shift());
  }
  if (props.arrow) {
    arr.push(arrow({
      element: arrowRef,
    }));
  }
  return arr;
});
const originPlacement = toRef(props, "placement");
const { floatingStyles, middlewareData, placement } = useFloating(referenceRef, floatingRef, {
  middleware,
  placement: originPlacement,
  whileElementsMounted(reference, floating, update) {
    if (props.autoUpdate) {
      return autoUpdate(reference, floating, update);
    }
    return noop;
  },
  transform: false,
});
const arrowStyle = computed(() => {
  const { x, y } = middlewareData.value.arrow || {};

  const side = placement.value.split("-")[0] as Side;

  const arrowEl = arrowRef.value;
  let offset = 0;
  if (arrowEl) {
    if (x !== undefined) {
      offset = -arrowEl.offsetHeight / 2;
    } else if (y !== undefined) {
      offset = -arrowEl.offsetWidth / 2;
    }
  }
  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[side];

  return {
    position: props.strategy,
    left: x === undefined ? "" : `${x}px`,
    top: y === undefined ? "" : `${y}px`,
    [staticSide]: `${offset}px`,
  };
});
const transform = useTransition(placement, "10%");
const transitionStyles = computed(() => ({
  "--menu-transform": transform.value,
}));
</script>

<template>
  <CustomSlot />

  <DefineTemplate>
    <Transition name="fade">
      <div v-if="mergedModelValue && !disabled" ref="floatingRef" :class="props.class" class="left-0 top-0 box-border w-max b-1 rounded-lg b-solid bg-background px-2 py-1.5 dark:b-darkbackground-light dark:bg-darkbackground" :style="[{ ...floatingStyles, ...transitionStyles }, style]">
        <slot name="content">
          {{ content }}
        </slot>
        <div v-if="props.arrow" ref="arrowRef" :style="arrowStyle" class="h-2 w-2 rotate-45 bg-gray-50"></div>
      </div>
    </Transition>
  </DefineTemplate>

  <Teleport v-if="teleport" to="body">
    <ReuseTemplate />
  </Teleport>
  <ReuseTemplate v-else />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-timing-function: ease;
  transition-duration: v-bind("`${props.animationDuration}ms`");
  transition-property: opacity, transform;
}

.fade-enter-from,
.fade-leave-to {
  transform: var(--menu-transform);
  opacity: 0;
}
</style>
