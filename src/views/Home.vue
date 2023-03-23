<template>
  <div class="relative p-y-18 box-border w-full h-full flex flex-col justify-center lg:justify-evenly items-center lg:flex-row bg-background dark:bg-darkbackground transition">
    <div :class="compatible ? 'orientation-shadow' : ''" class="w-fit lg:h-full flex flex-col justify-center items-center">
      <img
        class="w-30 h-30 lg:w-50 lg:h-50 rounded-999 select-none border-4 border-default dark:border-darkdefault transition"
        draggable="false" :src="Avatar" alt="avatar"
      />
      <Typewriter class="typewriter" @loaded="onTypewriterLoaded" />
    </div>
    <div :class="compatible ? 'orientation-shadow' : ''" class="flex items-center justify-center w-full lg:w-fit m-t-10 lg:m-t-0 w-fit">
      <div class="w-full m-x-17 lg:m-x-0 box-border grid grid-cols-1 xl:flex gap-3 xl:flex-gap-3">
        <div>
          <div class="xl:min-w-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            <Tagi title="Blog" icon="i-ri:book-read-fill" href="https://blog.keke.cc/" />
            <Tagi title="ChatGPT" desc="A ChatGPT Robot." icon="i-ri:chat-quote-fill" href="https://chatgpt.keke.cc/" />
          </div>
        </div>
        <div>
          <div class="text-7 text-center lg:text-start m-3 cursor-default">
            Projects
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            <Tagi title="Bilibili Fans Card" desc="A tool making bilibili fans card." href="https://bilibili-fans.keke.cc/">
              <template #icon>
                Fc
              </template>
            </Tagi>
            <Tagi title="Bilibili SuperChat" desc="Generate custom SuperChat image." href="https://sc.keke.cc/">
              <template #icon>
                Sc
              </template>
            </Tagi>
          </div>
        </div>
        <div class="xl:min-w-90">
          <div class="text-7 text-center lg:text-start m-3 cursor-default">
            Socials
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Tagi title="Bilibili" icon="i-ri:bilibili-fill" href="https://space.bilibili.com/32431375" target="_blank" />
            <Tagi title="GitHub" icon="i-ri:github-fill" href="https://github.com/Bernankez" target="_blank" />
            <Tagi title="简书" href="https://www.jianshu.com/u/97ce768c5437" target="_blank">
              <template #icon>
                简
              </template>
            </Tagi>
            <Tagi title="博客园" href="https://www.cnblogs.com/bernanke" target="_blank">
              <template #icon>
                博
              </template>
            </Tagi>
            <Tagi title="Lofter" icon="i-fa6-solid:l" href="https://bernankez.lofter.com" target="_blank" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { colorDarkBackground } from "@bernankez/theme";
import { uesOrientationShadow } from "@/composables/orientation-shadow";
import Avatar from "@/assets/avatar.webp";
import Typewriter from "@/components/Typewriter.vue";
import Website from "@/components/Website.vue";
import Tagi from "@/components/Tagi.vue";

let typewriterMinWidth = $ref("");
const onTypewriterLoaded = (style: CSSStyleDeclaration) => {
  typewriterMinWidth = style.width;
};

const { rotateY, offsetX, offsetY, compatible } = uesOrientationShadow();
</script>

<style scoped>
.orientation-shadow {
  transform: translateZ(16px) rotateY(v-bind(rotateY));
  filter: drop-shadow(v-bind(offsetX) v-bind(offsetY) 10px v-bind("colorDarkBackground.lighter"));
}

.typewriter {
  @apply m-t-5 lg-m-t-10;
  min-width: v-bind("typewriterMinWidth");
}
</style>
