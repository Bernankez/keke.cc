<template>
  <a :href="href" :target="target" class="group flex flex-gap-3 items-center p-2.5 box-border b-1.5 b-solid b-disabled-darker rounded-3.5 cursor-pointer">
    <div class="text-9 transition-300 text-default-light group-hover:text-default dark:group-hover:text-darkdefault">
      <slot name="icon">
        <div :class="icon"></div>
      </slot>
    </div>
    <div class="flex flex-col">
      <div class="text-4.5 transition-300 text-default-light group-hover:text-default dark:group-hover:text-darkdefault">
        <slot>{{ title }}</slot>
      </div>
      <div v-if="desc || $slots.desc" class="m-t-2 text-3.5 transition-300 text-default-light group-hover:text-default dark:text-default-light dark:group-hover:text-default-lighter">
        <slot name="desc">
          {{ desc }}
        </slot>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
const { title = "", desc = "", icon = "", href = "", target = "_blank" } = defineProps<{
  title?: string;
  desc?: string;
  icon?: string;
  href?: string;
  target?: string;
}>();
</script>

<style lang="scss" scoped>
</style>
