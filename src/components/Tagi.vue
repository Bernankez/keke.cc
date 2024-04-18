<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string;
  desc?: string;
  icon?: string;
  href?: string;
  to?: string;
  target?: string;
}>(), {
  title: "",
  desc: "",
  icon: "",
  href: "",
  to: "",
  target: "_blank",
});

const target = computed(() => props.href ? props.target : "");
</script>

<template>
  <RouterLink :to="to" class="block flex select-none items-center flex-gap-3 p-2 text-dark-500 dark:text-darkdefault" :href="href" :target="target">
    <div :class="icon" class="text-9"></div>
    <div class="w-full flex flex-col flex-gap-1">
      <div class="text-5">
        <slot>
          {{ title }}
        </slot>
      </div>
      <div class="text-3.5">
        {{ desc }}
      </div>
    </div>
  </RouterLink>
</template>
