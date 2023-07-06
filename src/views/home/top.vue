<template>
  <div class="flex flex-col flex-gap-4">
    <div class="flex flex-gap-2">
      <div v-if="!imageLoaded" class="i-svg-spinners:pulse h-20 w-20"></div>
      <img class="select-none rounded-999" :class="[imageLoaded ? 'h-20 w-20' : 'h-0 w-0']" draggable="false" src="/avatar.webp" alt="avatar" :onload="onImageLoad" />
      <div class="flex flex-col justify-center">
        <Typewriter data-blobity="true" data-blobity-magnetic="true" class="p-2 text-7.5" />
      </div>
    </div>
    <div class="flex flex-gap-3">
      <Icon href="https://blog.keke.cc/" title="Posts" icon="i-ri:bill-line" show="auto" />
      <Icon href="https://github.com/Bernankez" title="GitHub" icon="i-ri:github-line" show="auto" />
      <Icon icon="i-ri:bilibili-fill" title="Bilibili" href="https://space.bilibili.com/32431375" show="auto" />
      <Icon href="https://www.jianshu.com/u/97ce768c5437" title="简书" show="auto">
        <div class="h-5.5 w-5.5 flex items-center justify-center text-4.5">
          简
        </div>
      </Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
const imageLoaded = ref(false);

const onImageLoad = () => imageLoaded.value = true;
</script>
