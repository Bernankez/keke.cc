<template>
  <RouterLink :to="to" class="block flex items-center flex-gap-3 p-2" :href="href" :target="target">
    <div :class="icon" class="text-8"></div>
    <div class="flex flex-col flex-gap-3">
      <div class="text-5">
        {{ title }}
      </div>
      <div class="text-4">
        {{ desc }}
      </div>
    </div>
  </RouterLink>
</template>

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
