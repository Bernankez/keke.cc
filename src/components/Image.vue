<template>
  <img v-show="!loading" v-bind="$attrs" ref="imageRef" :src="src" :alt="alt" :onload="onImageLoad" />
  <template v-if="loading">
    <slot>
      <div class="i-svg-spinners:pulse" v-bind="$attrs"></div>
    </slot>
  </template>
</template>

<script setup lang="ts">
defineProps<{
  src: string;
  alt?: string;
}>();

const loading = ref(true);
const imageRef = ref<HTMLImageElement>();

const onImageLoad = () => {
  loading.value = false;
};

watchEffect(() => {
  if (imageRef.value?.complete) {
    loading.value = false;
  }
});
</script>
