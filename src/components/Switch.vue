<template>
  <div>
    <label class="group background cursor-pointer" :class="{ 'background--checked': checked }">
      <input
        v-model="value" class="display-none" type="checkbox" :disabled="disabled" :true-value="trueValue"
        :false-value="falseValue"
      />
      <div class="toggle" :class="{ 'toggle--checked': checked }">
        <Transition name="icon" mode="out-in">
          <slot v-if="checked" name="checked"></slot>
          <slot v-else name="unchecked"></slot>
        </Transition>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean | string | number;
  width?: string;
  height?: string;
  toggleDiameter?: string;
  toggleWider?: string;
  trueValue?: boolean | string | number;
  falseValue?: boolean | string | number;
  disabled?: boolean;
}

const {
  modelValue = false,
  trueValue = true,
  falseValue = false,
  disabled = false,
} = defineProps<Props>();

const emit = defineEmits<{
  (event: "update:modelValue", value: Props["modelValue"]): void;
  (event: "change", value: Props["modelValue"]): void;
}>();

const value = $computed<boolean>({
  get() {
    return modelValue as boolean;
  },
  set(val: Props["modelValue"]) {
    emit("update:modelValue", val);
    emit("change", val);
  },
});

const checked = $computed(() => value === trueValue);
</script>

<style scoped>
.background {
  --width: 45px;
  --height: 23px;
  --toggle-diameter: 26px;
  --toggle-wider: 28px;
  --button-toggle-offset: calc((var(--height) - var(--toggle-diameter)) / 2);
  --toggle-shadow-offset: 10px;

  @apply relative inline-block bg-background-dark;
  width: var(--width);
  height: var(--height);
  border-radius: calc(var(--height) / 2);
  transition: 0.3s all ease-in-out;
}

.background--checked {
  @apply bg-primary;
}

.toggle {
  @apply absolute inline-flex justify-center items-center text-default bg-background-lighter select-none;
  content: "";
  top: var(--button-toggle-offset);
  width: var(--toggle-diameter);
  height: var(--toggle-diameter);
  border-radius: calc(var(--toggle-diameter) / 2);
  transform: translateX(var(--button-toggle-offset));
  box-shadow: var(--toggle-shadow-offset) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
  transition: 0.3s all ease-in-out;
}

.group:active .toggle {
  width: var(--toggle-wider);
}

.toggle--checked {
  transform: translateX(calc(var(--width) - var(--toggle-diameter) - var(--button-toggle-offset)));
  box-shadow: calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
}

.group:active .toggle--checked {
  transform: translateX(calc(var(--width) - var(--toggle-wider) - var(--button-toggle-offset)));
}

.icon-enter-active,
.icon-leave-active {
  transition: opacity 0.1s ease;
}

.icon-enter-from,
.icon-leave-to {
  opacity: 0;
}
</style>
