<template>
  <div class="relative w-40% min-w-400px">
    <Typewriter class="absolute top-50%  -translate-y-50% left-35%" />
  </div>
  <div class="flex items-center justify-center w-60%">
    <div>
      <div class="p-y-4 box-border text-default dark:text-darkdefault text-6 cursor-default select-none">
        You can find me on:
      </div>
      <div class="w-fit grid grid-cols-2 gap-4">
        <Website
          left="#ff709f" right="#fb7299" :mask="false" nick-name="鹿野的科科"
          url="https://space.bilibili.com/32431375"
        >
          <template #icon>
            <div class="i-ri:bilibili-fill"></div>
          </template>
        </Website>
        <Website left="#24292f" right="#24292f" nick-name="科科" url="https://github.com/Bernankez">
          <template #icon>
            <div class="i-ri:github-fill"></div>
          </template>
        </Website>
        <Website left="#ec6149" nick-name="科科Cole" url="https://www.jianshu.com/u/97ce768c5437">
          <template #icon>
            <div class="text-15">
              简
            </div>
          </template>
        </Website>
        <Website left="#59a0e1" nick-name="科科" url="https://www.cnblogs.com/bernanke/">
          <template #icon>
            <div class="text-15">
              博
            </div>
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
  </div>
</template>

<script setup lang="ts">
import { useDark } from "@vueuse/core";
import Typewriter from "@/components/Typewriter.vue";
import Website from "@/components/Website.vue";

useDark();
</script>
