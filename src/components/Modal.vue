<template>
  <Mask to="body" :show="show" @click="onMask">
    <div class="h-30 w-30 bg-yellow">
      dialog
    </div>
  </Mask>
</template>

<script setup lang="ts">
const props = defineProps<{
  closeOnMask?: boolean;
}>();

const show = defineModel({ default: false });

function onMask() {
  if (props.closeOnMask) {
    show.value = !show.value;
  }
}
</script>
