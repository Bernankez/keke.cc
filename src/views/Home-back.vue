<template>
  <div class="relative box-border h-full w-full flex flex-col items-center justify-center bg-background p-y-18 transition lg:flex-row lg:justify-evenly dark:bg-darkbackground">
    <div class="w-fit flex flex-col items-center justify-center lg:h-full">
      <img
        class="h-30 w-30 select-none b-0 b-default rounded-999 b-solid transition lg:h-50 lg:w-50 dark:b-darkdefault"
        draggable="false" :src="Avatar" alt="avatar"
      />
      <Typewriter class="typewriter" @loaded="onTypewriterLoaded" />
    </div>
    <div class="m-t-10 w-fit w-full flex items-center justify-center lg:m-t-0 lg:w-fit">
      <div class="grid grid-cols-1 m-x-17 box-border w-full gap-3 lg:m-x-0 xl:flex xl:flex-gap-3">
        <div>
          <div class="grid grid-cols-1 gap-2 lg:grid-cols-1 sm:grid-cols-2 xl:min-w-50">
            <Tagi title="Blog" icon="i-ri:book-read-fill" href="https://blog.keke.cc/" />
            <Tagi title="ChatGPT" desc="A ChatGPT Robot." icon="i-ri:chat-quote-fill" href="https://chatgpt.keke.cc/" />
          </div>
        </div>
        <div>
          <div class="m-3 cursor-default text-center text-7 lg:text-start">
            Projects
          </div>
          <div class="grid grid-cols-1 gap-2 lg:grid-cols-1 sm:grid-cols-2">
            <Tagi title="Bilibili Fans Card" icon="i-ri:bilibili-fill" desc="A tool making bilibili fans card." href="https://bilibili-fans.keke.cc/" />
            <Tagi title="Bilibili SuperChat" icon="i-ri:bilibili-fill" desc="Generate custom SuperChat image." href="https://sc.keke.cc/" />
            <Tagi icon="i-mdi:counter" desc="Custom Visitor Badge." href="https://github.com/Bernankez/visitor-badge">
              <img class="h-12 object-scale-down" src="https://badge.keke.cc/api/keke.cc/bernankez" alt="visitor badge" />
            </Tagi>
            <Tagi title="Snippets" icon="i-mdi:vector-intersection" desc="Just snippets." href="https://snippets.keke.cc/" />
            <Tagi title="create-l" icon="i-simple-icons:typescript" desc="TypeScript library scaffold." href="https://github.com/Bernankez/create-l" />
          </div>
        </div>
        <!-- <div class="xl:min-w-90">
          <div class="m-3 cursor-default text-center text-7 lg:text-start">
            Socials
          </div>
          <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from "@/assets/avatar.webp";

const typewriterMinWidth = ref("");
const onTypewriterLoaded = (style: Record<keyof CSSStyleDeclaration, string>) => {
  typewriterMinWidth.value = style.width;
};
</script>

<style scoped>
.typewriter {
  @apply m-t-5 lg-m-t-10;

  min-width: v-bind("typewriterMinWidth");
}
</style>
