<script setup lang="ts">
import Popover from "@/components/Popover.vue";
import { version } from "~/package.json";

const show = ref(false);
const { use } = useZIndex();
const zIndex = ref(use());

const paddingRight = computed(() => {
  return `calc(1.25rem + ${lockHtmlScrollRightCompensationRef.value})`;
});
</script>

<template>
  <div :style="{ zIndex, paddingRight }" class="absolute left-0 top-0 box-border h-18 w-full flex items-center justify-between bg-transparent bg-opacity-70 p-x-5 dark:bg-opacity-70 lg:backdrop-blur-8 lg:backdrop-saturate-50">
    <div class="flex items-center flex-gap-3">
      <Icon icon="i-ri:calendar-2-line" title="DayGram" @click="show = !show" />
      <Calendar v-model="show" close-on-mask />
    </div>
    <div class="flex items-center flex-gap-3">
      <Popover trigger="click" class="flex" :animation-duration="100">
        <Icon :title="`v${version}`" show="title" />
        <template #content>
          <a class="flex items-center gap-2 px-2 py-1" href="https://github.com/Bernankez/keke.cc/tags" target="_blank">
            Releases
            <div class="i-line-md:external-link"></div>
          </a>
        </template>
      </Popover>
      <Icon icon="i-ri:chat-quote-line" title="ChatGPT Robot" href="https://chatgpt.keke.cc/" />
      <ColorModeSwitch />
    </div>
  </div>
</template>
