<script setup lang="ts">
const show = ref(false);
const { use } = useZIndex();
const zIndex = ref(use());
</script>

<template>
  <div :style="{ zIndex }" class="absolute left-0 top-0 box-border h-18 w-full flex items-center justify-between bg-transparent bg-opacity-70 p-x-5 dark:bg-opacity-70 lg:backdrop-blur-8 lg:backdrop-saturate-50">
    <div class="flex items-center flex-gap-3">
      <!-- <Icon icon="i-ri:calendar-2-line" title="DayGram" @click="show = !show" /> -->
      <Calendar v-model="show" close-on-mask />
    </div>
    <div class="flex items-center flex-gap-3">
      <Icon icon="i-ri:chat-quote-line" title="ChatGPT Robot" href="https://chatgpt.keke.cc/" />
      <ColorModeSwitch />
    </div>
  </div>
</template>
