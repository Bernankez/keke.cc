import { onMounted, ref } from "vue";
import { isClient } from "@vueuse/core";

export const useDevice = () => {
  const isIOS = ref(false);
  const isMobileDevice = ref(false);

  if (isClient) {
    isIOS.value = !!window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent);
    isMobileDevice.value = "ontouchstart" in document;
  } else {
    onMounted(() => {
      isIOS.value = !!window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent);
      isMobileDevice.value = "ontouchstart" in document;
    });
  }

  return {
    isIOS,
    isMobileDevice,
  };
};
