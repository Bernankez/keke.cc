<template>
  <a
    :href="href" :target="target"
    class="box-border flex cursor-default select-none items-center flex-gap-3 rounded-3.5 p-2.5 transition-300 bg-opacity-80! dark:bg-opacity-60!"
  >
    <div class="text-9 text-default-light transition-300">
      <slot name="icon">
        <div :class="icon"></div>
      </slot>
    </div>
    <div class="flex flex-col">
      <div
        class="flex items-center text-4.5 text-default-light transition-300"
      >
        <slot>{{ title }}</slot>
        <div v-if="target === '_blank'" class="i-ri:external-link-fill m-l-3"></div>
      </div>
      <div
        v-if="desc || $slots.desc"
        class="m-t-2 text-3.5 text-default-light transition-300 dark:text-default-light"
      >
        <slot name="desc">
          {{ desc }}
        </slot>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string;
  desc?: string;
  icon?: string;
  href?: string;
  target?: string;
}>(), {
  title: "",
  desc: "",
  icon: "",
  href: "",
  target: "",
});
</script>
