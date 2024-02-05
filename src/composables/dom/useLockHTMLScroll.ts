import type { MaybeRefOrGetter, WatchStopHandle } from "vue";

export interface UseLockHtmlScrollOptions {
  hideScrollbar?: boolean;
}

let lockCount = 0;
let originalPaddingRight = "";
let originalOverflow = "";
let originalOverflowX = "";
let originalOverflowY = "";
export const lockHtmlScrollRightCompensationRef = ref("0px");

export function useLockHtmlScroll(lockRef: MaybeRefOrGetter<boolean>, options: UseLockHtmlScrollOptions = {}): void {
  const { hideScrollbar = true } = options;
  // not browser
  if (typeof document === "undefined") { return; }
  const el = document.documentElement;
  let watchStopHandle: WatchStopHandle | undefined;
  let activated = false;
  const unlock = () => {
    el.style.paddingRight = originalPaddingRight;
    el.style.overflow = originalOverflow;
    el.style.overflowX = originalOverflowX;
    el.style.overflowY = originalOverflowY;
    lockHtmlScrollRightCompensationRef.value = "0px";
  };
  onMounted(() => {
    watchStopHandle = watch(() => toValue(lockRef), (lock) => {
      if (lock) {
        if (lockCount <= 0) {
          const scrollbarWidth = window.innerWidth - el.offsetWidth;
          if (scrollbarWidth > 0 && hideScrollbar) {
            originalPaddingRight = el.style.paddingRight;
            el.style.paddingRight = `${scrollbarWidth}px`;
            lockHtmlScrollRightCompensationRef.value = `${scrollbarWidth}px`;
          }
          originalOverflow = el.style.overflow;
          originalOverflowX = el.style.overflowX;
          originalOverflowY = el.style.overflowY;
          el.style.overflow = "hidden";
          el.style.overflowX = "hidden";
          el.style.overflowY = "hidden";
        }
        activated = true;
        lockCount++;
      } else {
        lockCount--;
        if (lockCount <= 0) {
          unlock();
        }
        activated = false;
      }
    }, {
      immediate: true,
    });
  });
  onBeforeUnmount(() => {
    watchStopHandle?.();
    if (activated) {
      lockCount--;
      if (lockCount <= 0) {
        unlock();
      }
      activated = false;
    }
  });
}
