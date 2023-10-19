<template>
  <Teleport v-if="show" to="body">
    <div class="absolute bottom-0 left-0 right-0 top-0">
      <div class="relative left-50% top-50% h-fit w-fit -translate-x-50% -translate-y-50%">
        Dialog
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const show = defineModel({ default: false });
// TODO https://github.com/tusen-ai/naive-ui/blob/79cdba591bcdbcf0a0b2dc9f9a6243563ace4a89/src/_utils/composable/use-lock-html-scroll.ts#L17
watchEffect(() => {
  if (show.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});
</script>
