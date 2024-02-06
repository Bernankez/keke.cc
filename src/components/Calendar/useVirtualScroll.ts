import type { MaybeRefOrGetter } from "vue";

export interface UseVirtualScrollOptions {
  width: MaybeRefOrGetter<number>;
}

export function useVirtualScroll<T = any>(list: MaybeRefOrGetter<T[]>, options: UseVirtualScrollOptions) {
  const { width } = options;

  const visibleCount = ref(1);
  const bufferSize = ref(5);

  const startOffset = ref(0);
  const startIndex = ref(0);
  const endIndex = computed(() => startIndex.value + visibleCount.value);
  const endOffset = computed(() => toValue(list).length * toValue(width) - startOffset.value - visibleCount.value * toValue(width));

  // TODO rerender on show

  const visibleData = computed(() => {
    const start = Math.max(0, startIndex.value - bufferSize.value);
    // TODO end boundary
    const end = Math.min(toValue(list).length, endIndex.value + bufferSize.value);
    return toValue(list).slice(start, end);
  });

  function _onScroll(offset: number) {
    // TODO use absolute position
    // TODO calculate translateY
    // can also fix width
    const c = toValue(width) - offset % toValue(width);
    startOffset.value = Math.max(0, offset - bufferSize.value * toValue(width) + c);
    startIndex.value = Math.floor(startOffset.value / toValue(width));
  }

  // TODO mock onScrollStart onScrollEnd

  // TODO onStart onEnd auto inject items

  return {
    startIndex,
    startOffset,
    endOffset,
    data: visibleData,
    onScroll(scrollOffset: number) {
      requestAnimationFrame(() => {
        _onScroll(scrollOffset);
      });
    },
  };
}
