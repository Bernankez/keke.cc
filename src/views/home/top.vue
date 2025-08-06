<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col flex-gap-4">
    <div class="flex flex-gap-2">
      <Image class="h-20 w-20 select-none rounded-full" src="/avatar.webp" alt="avatar" />
      <div class="flex flex-col justify-center">
        <Typewriter data-blobity="true" data-blobity-magnetic="true" class="p-2 text-7.5" />
      </div>
    </div>
    <div class="flex flex-gap-3">
      <Icon href="https://blog.keke.cc/" title="Posts" icon="i-ri:bill-line" show="auto" />
      <Icon href="https://gallery.keke.cc/" title="Gallery" icon="i-ri-camera-line" show="auto" />
      <Icon href="https://tracking.keke.cc/" title="Tracking" icon="i-ri:focus-2-line" show="auto" />
      <!-- <Icon href="https://status.keke.cc/" title="Status" icon="i-ri:broadcast-line" show="auto" /> -->
      <Icon href="https://github.com/Bernankez" title="GitHub" icon="i-ri:github-line" show="auto" />
      <Icon icon="i-ri:bilibili-fill" title="Bilibili" href="https://space.bilibili.com/32431375" show="auto" />
    </div>
  </div>
</template>
