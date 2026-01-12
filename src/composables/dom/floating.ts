import type { Placement } from "@floating-ui/vue";
import type { Fn } from "@vueuse/core";
import type { ComponentPublicInstance, EffectScope } from "vue";
import { noop } from "@vueuse/core";

export type TriggerType = "hover" | "click" | "focus" | "manual";

export type TriggerFunctions = {
  [Fn in TriggerType]?: () => void;
};

export interface UseFloatingTriggerOptions extends TriggerFunctions {
  openContent?: Fn;
  closeContent?: Fn;
  isOpened?: MaybeRefOrGetter<boolean | undefined>;
}

export function useFloatingTrigger<R extends MaybeRef<ComponentPublicInstance | HTMLElement | undefined>>(referenceRef: R, options: UseFloatingTriggerOptions = {}) {
  const { openContent = noop, closeContent = noop, hover, click, focus, manual, isOpened: _isOpened } = options;

  const isOpened = computed(() => toValue(_isOpened) || false);

  const triggerScope = ref<EffectScope>();
  const dispose = () => {
    triggerScope.value?.stop();
    triggerScope.value = undefined;
  };

  function triggerListener<T extends TriggerType>(trigger: T) {
    dispose();
    triggerScope.value = effectScope();
    if (trigger === "hover") {
      triggerScope.value.run(() => {
        if (hover) {
          hover();
        }
        else {
          const { isOutside } = useMouseInElement(referenceRef);
          watchEffect(() => {
            if (isOutside.value) {
              closeContent();
            }
            else {
              openContent();
            }
          });
        }
      });
    }
    else if (trigger === "focus") {
      triggerScope.value.run(() => {
        if (focus) {
          focus();
        }
        else {
          const { focused } = useFocusWithin(referenceRef);
          watchEffect(() => {
            if (focused.value) {
              openContent();
            }
            else {
              closeContent();
            }
          });
        }
      });
    }
    else if (trigger === "click") {
      triggerScope.value.run(() => {
        if (click) {
          click();
        }
        else {
          const referenceEl = computed(() => unrefElement(referenceRef));
          const { start, stop } = useListenClickOutside(referenceRef, () => {
            closeContent();
          }, { });
          useEventListener(referenceEl, "click", openContent);
          watchEffect(() => {
            if (isOpened.value) {
              start();
            }
            else {
              stop();
            }
          });
        }
      });
    }
    else if (trigger === "manual") {
    // do nothing
      if (manual) {
        manual();
      }
    }
    else {
      console.warn(`trigger[${trigger}] is not supported`);
    }
  }

  return {
    triggerListener,
    dispose,
  };
}

export function useListenClickOutside(...args: Parameters<typeof onClickOutside>) {
  const _stop = ref<Fn>();

  function stop() {
    _stop.value?.();
    _stop.value = undefined;
  }

  function start() {
    const [target, handler, options] = args;
    _stop.value = onClickOutside(target, handler, { ...options, controls: true }).stop;
  }

  return {
    start,
    stop,
  };
}

export function useTransition(placement: MaybeRefOrGetter<Placement>, offset: MaybeRefOrGetter<string | number> = "10%") {
  return computed(() => {
    const _placement = toValue(placement);
    const _offset = toValue(offset);

    const placementMap: Record<Placement, string> = {
      "top": `translateY(${_offset})`,
      "top-start": `translateY(${_offset}) translateX(-${_offset})`,
      "top-end": `translateY(${_offset}) translateX(${_offset})`,
      "bottom": `translateY(-${_offset})`,
      "bottom-start": `translateY(-${_offset}) translateX(-${_offset})`,
      "bottom-end": `translateY(-${_offset}) translateX(${_offset})`,
      "left": `translateX(${_offset})`,
      "left-start": `translateX(${_offset}) translateY(-${_offset})`,
      "left-end": `translateX(${_offset}) translateY(${_offset})`,
      "right": `translateX(-${_offset})`,
      "right-start": `translateX(-${_offset}) translateY(-${_offset})`,
      "right-end": `translateX(-${_offset}) translateY(${_offset})`,
    };

    return placementMap[_placement];
  });
}
