import type { MaybeComputedElementRef } from "@vueuse/core";
import type { MaybeRefOrGetter } from "vue";

export interface UseVirtualScrollOptions {
  scrollEl: MaybeComputedElementRef<HTMLElement | undefined>;
  width: MaybeRefOrGetter<number>;
  bufferSize?: MaybeRefOrGetter<number>;
}

export function useVirtualScroll<T = any>(list: MaybeRefOrGetter<T[]>, options: UseVirtualScrollOptions) {
  const { width, bufferSize = ref(5), scrollEl } = options;
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

  const renderData = computed(() => {
    return toValue(list).slice(startIndex.value, endIndex.value);
  });

  function handleScroll(scrollLeft: number) {
    updateRenderRange(scrollLeft);
  }

  // TODO end bound
  // TODO handle width change
  function updateRenderRange(scrollLeft: number) {
    offset.value = scrollLeft % toValue(width);
    const index = (offset.value <= (toValue(width) / 2)) ? Math.floor(scrollLeft / toValue(width)) : Math.ceil(scrollLeft / toValue(width));
    firstActiveIndex.value = useClamp(index, 0, totalLength).value;
    console.log("scrollLeft:", scrollLeft, "width:", toValue(width), "offset:", offset.value, "firstActiveIndex:", firstActiveIndex.value);
  }

  // TODO mock onScrollStart onScrollEnd
  // TODO onStart onEnd auto inject items

  return {
    firstActiveIndex,
    startIndex,
    startOffset,
    endIndex,
    offset,

    data: renderData,
    totalWidth,

    scrollTo(scrollLeft: number) {
      requestAnimationFrame(() => {
        handleScroll(scrollLeft);
      });
    },
  };
}
