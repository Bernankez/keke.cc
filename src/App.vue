<template>
  <Header />
  <div class="relative p-y-18 box-border w-full min-h-full flex flex-col justify-center lg:justify-evenly items-center lg:flex-row bg-background dark:bg-darkbackground-dark transition">
    <div class="w-fit lg:h-full flex flex-col justify-center items-center">
      <img
        class="w-30 h-30 lg:w-50 lg:h-50 rounded-999 select-none border-4 border-default dark:border-darkdefault transition"
        draggable="false" :src="Avatar" alt="avatar"
      />
      <Typewriter class="typewriter" @loaded="onTypewriterLoaded" />
    </div>
    <div class="flex items-center justify-center m-t-10 lg:m-t-0 w-fit">
      <div>
        <div class="w-fit grid grid-cols-3 gap-4">
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
          <Website left="#459a93" nick-name="科科" url="https://bernankez.lofter.com">
            <template #icon>
              <div class="text-18">
                L
              </div>
            </template>
          </Website>
          <Website left="#ff8200" mask mask-tip="■■■">
            <template #icon>
              <div class="i-ri:weibo-fill"></div>
            </template>
          </Website>
          <Website left="#595aff" mask mask-tip="■■■">
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
import Avatar from "@/assets/avatar.webp";
import Header from "@/layout/Header.vue";
import Typewriter from "@/components/Typewriter.vue";
import Website from "@/components/Website.vue";
import { colorPrimary } from "@/style/theme";

let typewriterMinWidth = $ref("");
const onTypewriterLoaded = (style: CSSStyleDeclaration) => {
  typewriterMinWidth = style.width;
};
</script>

<style scoped>
:global(::selection) {
  background-color: v-bind("colorPrimary.DEFAULT");
}

.typewriter {
  @apply m-t-5 lg-m-t-10;
  min-width: v-bind("typewriterMinWidth");
}
</style>
