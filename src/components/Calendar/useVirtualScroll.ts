import type { MaybeRefOrGetter } from "vue";

export interface UseVirtualScrollOptions {
  width: MaybeRefOrGetter<number>;
}

export function useVirtualScroll<T = any>(list: MaybeRefOrGetter<T[]>, options: UseVirtualScrollOptions) {
  const { width } = options;

  const visibleCount = ref(1);
  const bufferSize = ref(5);

  const scrollOffset = ref(0);
  const startIndex = ref(0);
  const endIndex = computed(() => startIndex.value + visibleCount.value);

  const visibleData = computed(() => {
    const start = Math.max(0, startIndex.value - bufferSize.value);
    const end = Math.min(toValue(list).length, endIndex.value + bufferSize.value);
    return toValue(list).slice(start, end);
  });

  function _onScroll(offset: number) {
    scrollOffset.value = offset;
    startIndex.value = Math.floor(scrollOffset.value / toValue(width));
  }

  return {
    startIndex,
    data: visibleData,
    onScroll(scrollOffset: number) {
      _onScroll(scrollOffset);
    },
  };
}
