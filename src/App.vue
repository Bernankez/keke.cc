<template>
  <div class="relative w-40% min-w-400px">
    <Name class="absolute top-50%  -translate-y-50% left-35%" />
  </div>
  <div class="flex items-center justify-center w-60%">
    <div class="w-fit grid grid-cols-1 gap-4">
      <div class="text-default dark:text-darkdefault text-6">
        You can find me on:
      </div>
      <Website left="#ff709f" right="#fb7299" :mask="false" nick-name="鹿野的科科" url="https://space.bilibili.com/32431375">
        <template #icon>
          <div class="i-ri:bilibili-fill"></div>
        </template>
      </Website>
      <Website left="#24292f" right="#24292f" nick-name="科科" url="https://github.com/Bernankez">
        <template #icon>
          <div class="i-ri:github-fill"></div>
        </template>
      </Website>
      <Website left="#ff8200" mask>
        <template #icon>
          <div class="i-ri:weibo-fill"></div>
        </template>
      </Website>
      <Website left="#595aff" mask>
        <template #icon>
          <div class="i-ri:mastodon-line"></div>
        </template>
      </Website>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark } from "@vueuse/core";
import Name from "@/components/Name.vue";
import Website from "@/components/Website.vue";

useDark();
</script>
