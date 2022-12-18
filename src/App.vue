<template>
  <div class="relative w-30% min-w-400px">
    <Name class="absolute top-50%  -translate-y-50% left-25%" />
  </div>
  <div class="w-full">
    You can find me on:<br />
    <Website left="#ff709f" right="#fb7299" :mask="false" nick-name="鹿野的科科" url="https://space.bilibili.com/32431375">
      <template #icon>
        <div class="i-ri:bilibili-fill"></div>
      </template>
    </Website>
    <Website :mask="true" nick-name="鹿野的科科">
      <template #icon>
        <div class="i-ri:github-fill"></div>
      </template>
    </Website>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { useDark } from "@vueuse/core";
import Name from "@/components/Name.vue";
import Website from "@/components/Website.vue";

// useDark();

useHead({
  title: "Website Title",
  meta: [
    {
      name: "description",
      content: "Website description",
    },
  ],
});
</script>
