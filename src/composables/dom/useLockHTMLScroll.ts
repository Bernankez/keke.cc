import type { MaybeRefOrGetter, WatchStopHandle } from "vue";

let lockCount = 0;
let originalMarginRight = "";
let originalOverflow = "";
let originalOverflowX = "";
let originalOverflowY = "";
export const lockHTMLScrollRightCompensationRef = ref("0px");

export function useLockHTMLScroll(lockRef: MaybeRefOrGetter<boolean>) {
  if (typeof document === "undefined") { return; }
  const el = document.documentElement;
  let stop: WatchStopHandle | undefined;
  let activated = false;
  const unlock = () => {
    el.style.marginRight = originalMarginRight;
    el.style.overflow = originalOverflow;
    el.style.overflowX = originalOverflowX;
    el.style.overflowY = originalOverflowY;
    lockHTMLScrollRightCompensationRef.value = "0px";
  };
  onMounted(() => {
    stop = watch(() => toValue(lockRef), (lock) => {
      if (lock) {
        if (lockCount <= 0) {
          const scrollbarWidth = window.innerWidth - el.offsetWidth;
          if (scrollbarWidth > 0) {
            originalMarginRight = el.style.marginRight;
            el.style.marginRight = `${scrollbarWidth}px`;
            lockHTMLScrollRightCompensationRef.value = `${scrollbarWidth}px`;
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
    stop?.();
    if (activated) {
      lockCount--;
      if (lockCount <= 0) {
        unlock();
      }
      activated = false;
    }
  });
}
