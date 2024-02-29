import { type Fn, type MaybeComputedElementRef } from "@vueuse/core";
import type { MaybeRefOrGetter } from "vue";

export interface UseVirtualScrollOptions {
  startActiveIndex?: number;
  scrollEl: MaybeComputedElementRef<HTMLElement | undefined>;
  width: MaybeRefOrGetter<number>;
  bufferSize?: MaybeRefOrGetter<number>;
  onScrollStart?: (e: UIEvent) => void;
  onScroll?: (e: UIEvent) => void;
  onScrollEnd?: Fn;
  onReachStart?: Fn;
  onReachEnd?: Fn;
  detectionInterval?: number;
}

export function useVirtualScroll<T = any>(list: MaybeRefOrGetter<T[]>, options: UseVirtualScrollOptions) {
  const { startActiveIndex = 0, width, bufferSize = ref(5), scrollEl, onScroll, onScrollStart, onScrollEnd, onReachStart, onReachEnd, detectionInterval = 100 } = options;
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
  const firstActiveIndex = ref(startActiveIndex);
  // [startIndex, endIndex)
  const startIndex = computed(() => Math.max(0, firstActiveIndex.value - toValue(bufferSize)));
  const startOffset = computed(() => startIndex.value * toValue(width));
  const endIndex = computed(() => Math.min(totalLength.value, firstActiveIndex.value + visibleCount.value + toValue(bufferSize)));

  watch(firstActiveIndex, (newIndex, oldIndex) => {
    if (!isDefined(oldIndex)) {
      onReachStart?.();
    } else {
      if (newIndex < toValue(bufferSize) && oldIndex >= toValue(bufferSize)) {
        onReachStart?.();
      } else if (newIndex > totalLength.value - toValue(bufferSize) && oldIndex <= totalLength.value - toValue(bufferSize)) {
        onReachEnd?.();
      }
    }
  }, { immediate: true });

  const renderData = computed(() => toValue(list).slice(startIndex.value, endIndex.value));

  const isScroll = ref(false);
  const scrollLeftRatio = ref(0);
  const debouncedScrollEnd = useDebounceFn(() => {
    isScroll.value = false;
    onScrollEnd?.();
  }, detectionInterval);

  function handleScroll(e: UIEvent) {
    if (ignoreScroll.value) {
      ignoreScroll.value = false;
      return;
    }
    if (!isScroll.value) {
      isScroll.value = true;
      onScrollStart?.(e);
    } else {
      onScroll?.(e);
    }
    debouncedScrollEnd();
    const el = e.currentTarget as HTMLDivElement;
    scrollLeftRatio.value = el.scrollLeft / el.scrollWidth;
    updateRenderRange(el.scrollLeft);
  }

  const ignoreScroll = ref(false);
  useResizeObserver(scrollEl, () => {
    const el = toValue(scrollEl);
    if (el) {
      ignoreScroll.value = true;
      el.scrollLeft = scrollLeftRatio.value * el.scrollWidth;
    }
  });

  function updateRenderRange(scrollLeft: number) {
    offset.value = scrollLeft % toValue(width);
    const index = (offset.value <= (toValue(width) / 2)) ? Math.floor(scrollLeft / toValue(width)) : Math.ceil(scrollLeft / toValue(width));
    firstActiveIndex.value = useClamp(index, 0, totalLength.value - 1).value;
  }

  function align(index: number, smooth = true) {
    const el = toValue(scrollEl);
    if (!el) {
      // TODO
      return;
    }
    if (smooth) {
      el.scrollTo({
        left: index * toValue(width),
        behavior: "smooth",
      });
    } else {
      el.scrollLeft = index * toValue(width);
    }
  }

  // TODO onStart onEnd auto inject items

  return {
    firstActiveIndex,
    startIndex,
    startOffset,
    endIndex,
    offset,

    data: renderData,
    totalWidth,

    isScroll,

    handleScroll,
    align,
  };
}
