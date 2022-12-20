<template>
  <a :href="url" target="_blank">
    <div class="background relative text-6 p-5 box-border w-70 rounded-2 cursor-pointer overflow-hidden">
      <div class="absolute -right-4 -bottom-4 text-17 text-white opacity-50">
        <slot name="icon">
        </slot>
      </div>
      <div class="nickname whitespace-pre" :title="maskTip">
        {{ nickName || " " }}
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
const {
  left = "black",
  right: _right,
  textColor = "white",
  url: _url,
  nickName: _nickName,
  mask = false,
  maskTip: _maskTip = "Corner of the world.",

  darkLeft: _darkLeft,
  darkRight: _darkRight,
  darkTextColor: _darkTextColor,
} = defineProps<{
  left?: string;
  right?: string;
  textColor?: string;
  url?: string;
  mask?: boolean;
  maskTip?: string;
  nickName?: string;

  darkLeft?: string;
  darkRight?: string;
  darkTextColor?: string;
}>();

const right = $computed(() => _right || left);
const url = $computed(() => mask ? undefined : _url);
const nickName = $computed(() => mask ? "■■■■■" : _nickName);
const maskTip = $computed(() => mask ? _maskTip : "");
const darkLeft = $computed(() => _darkLeft || left);
const darkRight = $computed(() => _darkRight || right);
const darkTextColor = $computed(() => _darkTextColor || textColor);
</script>

<style scoped>
.background {
  background-image: linear-gradient(to right, v-bind("left"), v-bind("right"));
}

.nickname {
  color: v-bind("textColor");
}

.dark .nickname {
  color: v-bind("darkTextColor");
}

.dark .background {
  background-image: linear-gradient(to right, v-bind("darkLeft"), v-bind("darkRight"));
}
</style>
