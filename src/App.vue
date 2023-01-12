<template>
  <div class="relative flex w-full h-full bg-background dark:bg-darkbackground-dark transition">
    <Switch v-model="isDark" class="absolute right-10 top-10">
      <template #checked>
        <div class="i-ri:moon-line"></div>
      </template>
      <template #unchecked>
        <div class="i-ri:sun-line"></div>
      </template>
    </Switch>
    <div class="w-50% min-w-400px">
      <div class="w-full h-full flex flex-col justify-center items-center">
        <img class="w-50 h-50 rounded-999 select-none border-4 border-default dark:border-darkdefault" draggable="false" :src="Avatar" alt="avatar" />
        <Typewriter class="min-w-204px m-t-10" />
      </div>
    </div>
    <div class="flex items-center justify-center w-50%">
      <div>
        <div class="w-fit grid grid-cols-3 gap-4">
          <Website
            mode="expand" left="#ff709f" right="#fb7299" :mask="false" nick-name="鹿野的科科"
            url="https://space.bilibili.com/32431375"
          >
            <template #icon>
              <div class="i-ri:bilibili-fill"></div>
            </template>
          </Website>
          <Website mode="expand" left="#24292f" right="#24292f" nick-name="科科" url="https://github.com/Bernankez">
            <template #icon>
              <div class="i-ri:github-fill"></div>
            </template>
          </Website>
          <Website mode="expand" left="#ec6149" nick-name="科科Cole" url="https://www.jianshu.com/u/97ce768c5437">
            <template #icon>
              <div class="text-15">
                简
              </div>
            </template>
          </Website>
          <Website mode="expand" left="#59a0e1" nick-name="科科" url="https://www.cnblogs.com/bernanke/">
            <template #icon>
              <div class="text-15">
                博
              </div>
            </template>
          </Website>
          <Website mode="expand" left="#ff8200" mask mask-tip="■■■">
            <template #icon>
              <div class="i-ri:weibo-fill"></div>
            </template>
          </Website>
          <Website mode="expand" left="#595aff" mask mask-tip="■■■">
            <template #icon>
              <div class="i-ri:mastodon-line"></div>
            </template>
          </Website>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark } from "@vueuse/core";
import Switch from "./components/Switch.vue";
import Avatar from "@/assets/avatar.webp";
import Typewriter from "@/components/Typewriter.vue";
import Website from "@/components/Website.vue";
import { colorPrimary } from "@/style/theme";

const isDark = $(useDark());
</script>

<style>
::selection {
  background-color: v-bind("colorPrimary.DEFAULT");
}
</style>
