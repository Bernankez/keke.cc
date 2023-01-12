<template>
  <a ref="background" class="background overflow-hidden rounded-2" :href="url" target="_blank">
    <div class="relative text-6 p-y-8 p-x-5 box-border w-70 cursor-pointer spotlight">
      <div class="absolute -right-4 -bottom-4 text-17 text-white opacity-50">
        <slot name="icon">
        </slot>
      </div>
      <div class="nickname whitespace-pre w-fit" :title="maskTip">
        {{ nickName || " " }}
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { useMouseInElement } from "@vueuse/core";
import { TinyColor } from "@ctrl/tinycolor";

const {
  left = "black",
  right: _right,
  textColor = "white",
  url: _url,
  nickName: _nickName,
  mask = false,
  maskTip: _maskTip = "Corner of the world.",
  spotlightColor: _spotlightColor,

  darkLeft: _darkLeft,
  darkRight: _darkRight,
  darkTextColor: _darkTextColor,
  darkSpotlightColor: _darkSpotlightColor,
} = defineProps<{
  left?: string;
  right?: string;
  textColor?: string;
  url?: string;
  mask?: boolean;
  maskTip?: string;
  nickName?: string;
  spotlightColor?: string;

  darkLeft?: string;
  darkRight?: string;
  darkTextColor?: string;
  darkSpotlightColor?: string;
}>();

const right = $computed(() => _right || left);
const url = $computed(() => mask ? undefined : _url);
const nickName = $computed(() => mask ? "■■■■■" : _nickName);
const maskTip = $computed(() => mask ? _maskTip : "");
const darkLeft = $computed(() => _darkLeft || left);
const darkRight = $computed(() => _darkRight || right);
const darkTextColor = $computed(() => _darkTextColor || textColor);
const spotlightColor = $computed(() => _spotlightColor || (new TinyColor(left).mix(right).darken().toHexString()));
const darkSpotlightColor = $computed(() => _darkSpotlightColor || spotlightColor);
const edgeSpotlightColor = $computed(() => (new TinyColor(spotlightColor).setAlpha(0.1).toRgbString()));
const darkEdgeSpotlightColor = $computed(() => (new TinyColor(darkSpotlightColor).setAlpha(0.1).toRgbString()));

const background = $ref<HTMLAnchorElement>();
const { elementX: _elementX, elementY: _elementY } = $(useMouseInElement($$(background)));
const elementX = $computed(() => `${_elementX}px`);
const elementY = $computed(() => `${_elementY}px`);
</script>

<style scoped>
.background {
  background-image: linear-gradient(to right, v-bind("left"), v-bind("right"));
}

.spotlight {
  background: radial-gradient(circle at v-bind("elementX") v-bind("elementY"), v-bind("spotlightColor") 0%, rgba(255, 255, 255, 0) calc(0% + 70px)) no-repeat border-box border-box v-bind("edgeSpotlightColor");
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

.dark .spotlight {
  background: radial-gradient(circle at v-bind("elementX") v-bind("elementY"), v-bind("darkSpotlightColor") 0%, rgba(255, 255, 255, 0) calc(0% + 70px)) no-repeat border-box border-box v-bind("darkEdgeSpotlightColor");
}
</style>
