<template>
  <div class="h-full w-full flex items-center justify-center">
    <div class="box-border h-full max-w-200 w-full flex flex-col flex-gap-4 p-x-10">
      <Top />
      <Bottom />
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from "./top.vue";
import Bottom from "./bottom.vue";
</script>
