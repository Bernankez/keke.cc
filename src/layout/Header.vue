<template>
  <div
    class="absolute z-1 top-0 left-0 flex items-center justify-between w-full h-18 lg:backdrop-saturate-50 lg:backdrop-blur-8 bg-opacity-70 dark:bg-opacity-70 bg-transparent p-x-5 box-border"
  >
    <div></div>
    <div class="flex items-center flex-gap-4">
      <div v-if="showGrant" class="flex justify-center items-center w-30px h-30px bg-background-lighter shadow-sm rounded-999 select-none cursor-pointer" title="enable shaking" @click="onGrant">
        👋
      </div>
      <ModeSwitch />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModeSwitch from "@/components/ModeSwitch.vue";

const { showGrant = false } = defineProps<{
  showGrant?: boolean;
}>();

const emit = defineEmits<{
  (event: "grant"): void;
}>();

const onGrant = () => {
  emit("grant");
};
</script>

<style lang="scss" scoped>

</style>
