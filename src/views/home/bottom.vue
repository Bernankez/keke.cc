<template>
  <div class="text-7">
    Projects
    <div class="grid grid-cols-1 m-t-2 grid-gap-2 md:grid-cols-2">
      <Tagi title="Bilibili Fans Card" icon="i-ri:bilibili-fill" desc="A tool making bilibili fans card." href="https://bilibili-fans.keke.cc/" />
      <Tagi title="Bilibili SuperChat" icon="i-ri:bilibili-fill" desc="Generate custom SuperChat image." href="https://sc.keke.cc/" />
      <Tagi icon="i-mdi:counter" desc="Custom Visitor Badge." href="https://github.com/Bernankez/visitor-badge">
        <img class="object-scale-down" :class="[imageLoaded ? 'h-12' : '']" src="https://badge.keke.cc/api/keke.cc/bernankez" alt="visitor badge" :onload="onImageLoad" />
        <div v-if="!imageLoaded" class="h-12 flex items-center">
          Visitor Badge
          <div class="i-svg-spinners:pulse text-10"></div>
        </div>
      </Tagi>
      <Tagi title="Snippets" icon="i-mdi:vector-intersection" desc="Just snippets." href="https://snippets.keke.cc/" />
      <Tagi title="create-l" icon="i-gridicons:create" desc="TypeScript library scaffold." href="https://github.com/Bernankez/create-l" />
    </div>
  </div>
</template>

<script setup lang="ts">
const imageLoaded = ref(false);

const onImageLoad = () => imageLoaded.value = true;
</script>
