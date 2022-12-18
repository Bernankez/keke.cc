<template>
  <div class="relative w-30% min-w-400px">
    <Name class="absolute top-50%  -translate-y-50% left-25%" />
  </div>
  <!-- <div>dd</div> -->
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { useDark } from "@vueuse/core";
import Name from "@/components/Name.vue";

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
