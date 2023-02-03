import { useDeviceOrientation } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useDevice } from "./device";

type DOE = typeof window.DeviceOrientationEvent;
export interface IOSDeviceOrientationEvent extends DOE {
  requestPermission: () => Promise<"granted" | "denied">;
}

export function uesOrientationShadow() {
  const { alpha, beta, gamma, isSupported } = useDeviceOrientation();
  const { isMobileDevice, isIOS } = useDevice();
  const isGranted = ref(false);
  const isDenied = ref(false);
  const compatible = computed(() => isMobileDevice.value && isSupported.value);

  const rotateY = computed(() => `${(gamma.value ?? 0) / 2}deg`);
  const offsetX = computed(() => `${-0.01 * (gamma.value ?? 0) * 16}px`);
  const offsetY = computed(() => {
    // Suppose the initial angle is 45 degrees
    let _beta = (beta.value || 45) - 45;
    if (_beta < -180) {
      _beta = 180 + (_beta % 180);
    }
    return `${-1 * Math.sin(_beta / 180 * Math.PI) * 16}px`;
  });

  onMounted(() => {
    if (isMobileDevice.value && (!isIOS.value || !("requestPermission" in window.DeviceOrientationEvent))) {
      // Only android devices or ios version < 14.5 doesn't need to grant
      isGranted.value = true;
    }
  });

  function grant() {
    const result = confirm("想要试试小彩蛋吗👾");
    if (!result) { return; }
    if (compatible.value && (!isGranted.value || !isDenied.value)) {
      (window.DeviceOrientationEvent as IOSDeviceOrientationEvent).requestPermission().then((response) => {
        if (response === "granted") {
          isGranted.value = true;
        } else {
          isDenied.value = true;
          alert("之后如果想体验小彩蛋，需要关掉页面再重新打开哦😗");
        }
      });
    }
  }

  // const offsetX = Math.sin((Math.abs(betaRef.value) < 90 ? gammaRef.value : -gammaRef.value) * Math.PI / 180); // - 90 < beta < 90 时，手机朝上
  // const offsetY = Math.sin(betaRef.value * Math.PI / 180);
  // degRef.value = -Math.atan(-offsetY / offsetX) * 180 / Math.PI + (offsetX < 0 ? -180 : 0) - 45;

  return {
    alpha,
    beta,
    gamma,
    compatible,

    rotateY,
    offsetX,
    offsetY,
    grant,
    isGranted,
    isDenied,

    isIOS,
  };
}
