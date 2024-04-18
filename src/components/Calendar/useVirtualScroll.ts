import type { Fn, MaybeComputedElementRef } from "@vueuse/core";
import type { MaybeRefOrGetter } from "vue";

export interface UseVirtualScrollOptions {
  scrollEl: MaybeComputedElementRef<HTMLElement | undefined>;
  width: MaybeRefOrGetter<number>;
  bufferSize?: MaybeRefOrGetter<number>;
  onScrollStart?: (e: Event) => void;
  onScroll?: (e: Event) => void;
  onScrollEnd?: Fn;
  onReachStart?: Fn;
  onReachEnd?: Fn;
  detectionInterval?: number;
}

export interface ManualScrollOptions {
  emit?: boolean;
  behavior?: "auto" | "smooth";
}

export interface SetFirstActiveIndexOptions {
  keepOffset?: boolean;
  behavior?: "auto" | "smooth";
}

export function useVirtualScroll<T = any>(list: MaybeRefOrGetter<T[]>, options: UseVirtualScrollOptions) {
  const { width, bufferSize = ref(5), scrollEl, onScroll, onScrollStart, onScrollEnd, onReachStart, onReachEnd, detectionInterval = 100 } = options;
  const visibleCount = computed(() => {
    const el = toValue(scrollEl);
    if (!el) {
      return 1;
    }
    return Math.ceil(el.clientWidth / toValue(width));
  });

  const totalLength = computed(() => toValue(list).length);
  const totalWidth = computed(() => totalLength.value * toValue(width));

  const offset = ref(0);
  const firstActiveIndex = ref(0);
  // [startIndex, endIndex)
  const startIndex = computed(() => Math.max(0, firstActiveIndex.value - toValue(bufferSize)));
  const startOffset = computed(() => startIndex.value * toValue(width));
  const endIndex = computed(() => Math.min(totalLength.value, firstActiveIndex.value + visibleCount.value + toValue(bufferSize)));

  watchEffect(() => {
    if (firstActiveIndex.value < toValue(bufferSize)) {
      onReachStart?.();
    } else if (firstActiveIndex.value > totalLength.value - toValue(bufferSize)) {
      onReachEnd?.();
    }
  });

  const ignoreScrollEvent = ref(false);
  const scrollLeftRatio = ref(0);
  const isScroll = ref(false);
  const debouncedScrollEnd = useDebounceFn(() => {
    isScroll.value = false;
    onScrollEnd?.();
  }, detectionInterval);

  function scroll(scrollLeft: number, options?: ManualScrollOptions) {
    const el = toValue(scrollEl);
    if (!el) {
      return;
    }
    if (el.scrollLeft === scrollLeft) {
      return;
    }
    const { emit = false, behavior } = options || {};
    ignoreScrollEvent.value = !emit;
    el.scrollTo({
      left: scrollLeft,
      behavior,
    });
  }

  function handleScroll(e: Event) {
    if (ignoreScrollEvent.value) {
      ignoreScrollEvent.value = false;
      return;
    }
    if (!isScroll.value) {
      onScrollStart?.(e);
    } else {
      onScroll?.(e);
    }
    isScroll.value = true;
    debouncedScrollEnd?.();
    const el = e.currentTarget as HTMLDivElement;
    scrollLeftRatio.value = el.scrollLeft / el.scrollWidth;
    updateRenderRange(el.scrollLeft);
  }

  function updateRenderRange(scrollLeft: number) {
    offset.value = scrollLeft % toValue(width);
    const index = (offset.value <= (toValue(width) / 2)) ? Math.floor(scrollLeft / toValue(width)) : Math.ceil(scrollLeft / toValue(width));
    firstActiveIndex.value = useClamp(index, 0, totalLength.value - 1).value;
  }

  useResizeObserver(scrollEl, () => {
    const el = toValue(scrollEl);
    if (el) {
      const scrollLeft = scrollLeftRatio.value * el.scrollWidth;
      scroll(scrollLeft);
    }
  });

  function setFirstActiveIndex(index: number, autoScroll = true, scrollOptions?: SetFirstActiveIndexOptions) {
    const { behavior = "smooth", keepOffset = true } = scrollOptions || {};
    if (autoScroll) {
      const el = toValue(scrollEl);
      if (el) {
        let scrollLeft = index * toValue(width);
        if (keepOffset) {
          const offset = scrollLeft % toValue(width);
          scrollLeft += offset;
        }
        if (scrollLeft !== el.scrollLeft) {
          scroll(scrollLeft, { emit: true, behavior });
        }
      }
    }
    firstActiveIndex.value = index;
  }

  return {
    firstActiveIndex: readonly(firstActiveIndex),
    setFirstActiveIndex,

    startIndex,
    startOffset,
    endIndex,
    offset,

    data: computed(() => toValue(list).slice(startIndex.value, endIndex.value)),
    totalWidth,

    scroll,
    isScroll,
    handleScroll,
  };
}
