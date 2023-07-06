import type { MaybeRefOrGetter } from "vue";

export interface AnimationOptions {
  interval?: number;
  autoRun?: boolean;
  textIteration?: number;
}

export function useHackedText(text: MaybeRefOrGetter<string>, options?: AnimationOptions) {
  const { interval = 50, autoRun = true, textIteration = 7 } = options || {};

  const messyCodes = "斅兝谲萿祧劝峅夬殡繦够夐氍兯吷葾隼两冴绘鷘志婾兠峫夑环婥峆吚塖鎱";
  let lastTime = 0;
  let elapsedTime = 0;
  const animationId: number | null = null;
  const hackedText = ref("");

  function run() {
    let iteration = 0;
    const t = toValue(text);
    animationId && cancelAnimationFrame(animationId);

    function animate(immediate = false) {
      if (!immediate) {
        elapsedTime = performance.now() - lastTime;
        if (elapsedTime < interval) {
          requestAnimationFrame(() => animate());
          return;
        }
      }

      lastTime = performance.now();
      hackedText.value = t.split("").map((_, index) => {
        if (index < iteration) {
          return t[index];
        }
        return messyCodes[Math.floor(Math.random() * messyCodes.length)];
      }).join("");
      iteration += 1 / textIteration;

      if (iteration < t.length) {
        requestAnimationFrame(() => animate());
      }
    }

    lastTime = performance.now();
    animate(true);
  }

  if (autoRun) {
    run();
  }

  return {
    run,
    hackedText,
  };
}
