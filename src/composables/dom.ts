import type { MaybeComputedElementRef } from "@vueuse/core";
import { unrefElement } from "@vueuse/core";
import { nextTick, ref, watch } from "vue";

export function useHiddenElementStyle(target: MaybeComputedElementRef) {
  const style = ref({} as CSSStyleDeclaration);

  watch(
    () => unrefElement(target),
    async (el) => {
      if (el) {
        const _style = el.style;
        const _computedStyle = window.getComputedStyle(el);
        const { getStyle } = createStyleSelector({ style: _style, computedStyle: _computedStyle });
        const display = getStyle("display");
        const visibility = getStyle("visibility");
        const position = getStyle("position");
        if (display === "none") {
          el.style.display = "unset";
          el.style.visibility = "hidden";
          el.style.position = "absolute";
          style.value = { ...window.getComputedStyle(el) };
          el.style.position = <string>position;
          el.style.visibility = <string>visibility;
          el.style.display = <string>display;
        } else {
          style.value = { ...window.getComputedStyle(el) };
        }
      }
    });

  return {
    style,
  };
}

function createStyleSelector(options?: { style?: CSSStyleDeclaration; computedStyle?: CSSStyleDeclaration }) {
  const { style = {}, computedStyle = {} } = options || {};
  return {
    getStyle(prop: keyof CSSStyleDeclaration) {
      return (style as CSSStyleDeclaration)[prop] || (computedStyle as CSSStyleDeclaration)[prop] || "";
    },
  };
}
