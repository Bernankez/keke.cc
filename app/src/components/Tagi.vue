<script setup lang="ts">
import type { VariantProps } from "cva";
import { cva } from "cva";

const props = withDefaults(defineProps<{
  title?: string;
  desc?: string;
  icon?: string;
  href?: string;
  to?: string;
  target?: string;
  status?: TagiVariants["status"];
}>(), {
  title: "",
  desc: "",
  icon: "",
  href: "",
  to: "",
  target: "_blank",
  status: "active",
});

const target = computed(() => props.href ? props.target : "");

type TagiVariants = VariantProps<typeof tagiVariants>;

const tagiVariants = cva(
  "",
  {
    variants: {
      status: {
        // actively maintained
        active: "bg-green",
        // maybe outdated
        outdated: "bg-yellow-8",
        // still in development, unstable
        experimental: "bg-orange",
        // has known serious issues
        unusable: "bg-red",
        // archived
        archived: "bg-gray",
        // deprecated
        deprecated: "bg-black",
      },
    },
  },
);
</script>

<template>
  <RouterLink :to="to" class="group block flex select-none items-center flex-gap-3 p-2 text-dark-500 dark:text-darkdefault" :href="href" :target="target">
    <div>
      <div :class="icon" class="text-9"></div>
      <div class="mx-auto h-1.5 w-1.5 rounded-full transition-500 transition-delay-250 group-hover:invert" :class="[tagiVariants({ status })]"></div>
    </div>
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
