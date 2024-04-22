import type { MaybeRefOrGetter, WatchStopHandle } from "vue";

export interface UseLockHtmlScrollOptions {
  hideScrollbar?: boolean;
  manual?: boolean;
}

const lockCount = ref(0);
const originStyles = ref({
  paddingRight: "",
  overflow: "",
  overflowX: "",
  overflowY: "",
});
const unlockTempStyles = ref({
  paddingRight: "",
  overflow: "",
  overflowX: "",
  overflowY: "",
});
export const lockHtmlScrollRightCompensationRef = ref("0px");

export function useLockHtmlScroll(lockRef: MaybeRefOrGetter<boolean>, options: UseLockHtmlScrollOptions = {}) {
  const { hideScrollbar = true, manual = false } = options;
  // not browser
  if (typeof document === "undefined") {
    return {};
  }
  const el = document.documentElement;
  const watchStopHandle = ref<WatchStopHandle>();
  const activated = ref(false);
  const markUnlocked = ref(false);

  function markUnlock() {
    markUnlocked.value = true;
    unlockTempStyles.value = {
      paddingRight: originStyles.value.paddingRight,
      overflow: originStyles.value.overflow,
      overflowX: originStyles.value.overflowX,
      overflowY: originStyles.value.overflowY,
    };
  }

  function unlock() {
    if (!markUnlocked.value) {
      return;
    }
    el.style.paddingRight = unlockTempStyles.value.paddingRight;
    el.style.overflow = unlockTempStyles.value.overflow;
    el.style.overflowX = unlockTempStyles.value.overflowX;
    el.style.overflowY = unlockTempStyles.value.overflowY;
    lockHtmlScrollRightCompensationRef.value = "0px";
    markUnlocked.value = false;
  }

  function lock() {
    if (markUnlocked.value) {
      unlock();
    }
    const scrollbarWidth = window.innerWidth - el.offsetWidth;
    if (scrollbarWidth > 0 && hideScrollbar) {
      originStyles.value.paddingRight = el.style.paddingRight;
      el.style.paddingRight = `${scrollbarWidth}px`;
      lockHtmlScrollRightCompensationRef.value = `${scrollbarWidth}px`;
    }
    originStyles.value.overflow = el.style.overflow;
    originStyles.value.overflowX = el.style.overflowX;
    originStyles.value.overflowY = el.style.overflowY;
    el.style.overflow = "hidden";
    el.style.overflowX = "hidden";
    el.style.overflowY = "hidden";
  };
  onMounted(() => {
    watchStopHandle.value = watch(() => toValue(lockRef), (isLocked) => {
      if (isLocked) {
        if (lockCount.value <= 0 && !manual) {
          lock();
        }
        activated.value = true;
        lockCount.value++;
      } else {
        lockCount.value--;
        if (lockCount.value <= 0 && !manual) {
          markUnlock();
          unlock();
        }
        activated.value = false;
      }
    }, {
      immediate: true,
    });
  });
  onBeforeUnmount(() => {
    watchStopHandle.value?.();
    if (activated) {
      lockCount.value--;
      if (lockCount.value <= 0) {
        markUnlock();
        unlock();
      }
      activated.value = false;
    }
  });

  return {
    markUnlock,
    unlock,
    lock,
  };
}
