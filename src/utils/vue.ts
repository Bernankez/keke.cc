import type { ComponentPublicInstance, Slot, VNode, VNodeChild } from "vue";
import { Comment, createTextVNode, Fragment } from "vue";

export function createSlot<T extends Slot<any>>(slot?: T, name?: string) {
  const _slotRef = ref<ComponentPublicInstance | HTMLElement>();
  const slotRef = computed(() => {
    const instance = _slotRef.value as ComponentPublicInstance & { slotRef?: ComponentPublicInstance | HTMLElement };
    if (instance?.slotRef) {
      return instance.slotRef as ComponentPublicInstance | HTMLElement;
    }
    return _slotRef.value;
  });

  const slotVNode = computed(() => slotToVNode(slot, name));

  const CustomSlot = defineComponent(() => {
    return () => h(slotVNode.value, { ref: _slotRef });
  });

  return makeDestructurable(
    { CustomSlot, slotRef } as const,
    [CustomSlot, slotRef] as const,
  );
}

const textVNodeType = createTextVNode("").type;

export function slotToVNode<T extends Slot<any>>(slot?: T, name?: string) {
  const slotName = `slot${name ? `[${name}]` : ""}`;
  if (!slot) {
    console.warn(`${slotName} should not be empty`);
    return h("span");
  }
  const slots = flatten(slot());
  if (slots.length > 1) {
    console.warn(`${slotName} should only have one exactly child`);
  }
  const defaultSlot = slots[0];
  if (defaultSlot.type === textVNodeType) {
    return h("span", defaultSlot);
  }
  return defaultSlot;
}

// o(n) flatten
export function flatten(
  vNodes: VNodeChild[],
  filterCommentNode = true,
  result: VNode[] = [],
): VNode[] {
  vNodes.forEach((vNode) => {
    if (vNode === null) {
      return;
    }
    if (typeof vNode !== "object") {
      if (typeof vNode === "string" || typeof vNode === "number") {
        result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flatten(vNode, filterCommentNode, result);
      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null) {
        return;
      }
      if (Array.isArray(vNode.children)) {
        flatten(vNode.children, filterCommentNode, result);
      }
      // rawSlot
    } else if (vNode.type !== Comment) {
      result.push(vNode);
    }
  });
  return result;
}
