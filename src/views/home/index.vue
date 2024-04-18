<script setup lang="ts">
import Top from "./top.vue";
import Bottom from "./bottom.vue";

const says: string[] = ["什么也不会，喜欢睡觉"];
const index = Math.floor(Math.random() * (says.length));

const { hackedText } = useHackedText(says[index]);
</script>

<template>
  <div class="relative">
    <div class="h-full w-full flex items-center justify-center">
      <div class="box-border h-full max-w-200 w-full flex flex-col flex-gap-4 p-x-10 p-b-10">
        <Top />
        <Bottom />
      </div>
    </div>
    <div class="absolute bottom-0 box-border h-10 w-full flex items-end justify-center p-b-2">
      <span class="text-3.5 tracking-3 text-disabled-dark md:tracking-7">/{{ hackedText }}/</span>
    </div>
  </div>
</template>
