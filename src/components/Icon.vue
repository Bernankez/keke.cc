<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw;
  icon?: string;
  title?: string;
  target?: string;
  href?: string;
  show?: "title" | "icon" | "auto";
}>(), {
  to: "",
  target: "_blank",
  show: "icon",
});

const emit = defineEmits<{
  click: [e: MouseEvent];
}>();

const target = computed(() => props.href ? props.target : "");
</script>

<template>
  <RouterLink :to="to" :href="href" :target="target" class="select-none p-2" @click="(e:MouseEvent) => emit('click', e)">
    <div :title="title" class="flex flex-gap-2 text-default transition-500 dark:text-darkdefault">
      <div :class="[show === 'auto' ? 'md:hidden' : '']" class="text-5.5">
        <slot>
          <div :class="icon"></div>
        </slot>
      </div>
      <div :class="[show === 'title' ? '' : 'hidden', show === 'auto' ? 'md:block' : '']">
        {{ title }}
      </div>
    </div>
  </RouterLink>
</template>
