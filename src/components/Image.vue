<template>
  <img v-if="!loading" ref="imageRef" :src="src" :alt="alt" />
  <template v-else>
    <slot>
      <div class="i-svg-spinners:pulse" v-bind="$attrs"></div>
    </slot>
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt?: string;
}>();

const loading = ref(true);
const imageRef = ref<HTMLImageElement>();

watchEffect(() => {
  if (props.src) {
    reset();
    loadImage();
  }
});

function reset() {
  loading.value = true;
}
function loadImage() {
  const img = new Image();
  img.onload = () => {
    loading.value = false;
  };
  img.src = props.src;
}
</script>
