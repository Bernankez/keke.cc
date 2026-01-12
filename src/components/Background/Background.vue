<script setup lang="ts">
import { useBackmoji, useTextRenderer } from "@backmoji/vue";
import { useResizeObserver } from "@vueuse/core";
import { animate } from "./animation";

const { play, setCallback, getTimestamp } = animate({
  speed: 0.1,
});

const canvasRef = ref<HTMLCanvasElement>();

const renderer = useTextRenderer("</>", {
  font: "30px Aria",
  customRender({ ctx, item, renderItemWidth, renderItemHeight, rowGap, columnGap, columnCount, rowCount }) {
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      let from: number, to: number;
      if (rowIndex % 2 === 0) {
        from = -2;
        to = columnCount;
      }
      else {
        from = 0;
        to = columnCount + 2;
      }
      for (let columnIndex = from; columnIndex < to; columnIndex++) {
        let offset = getTimestamp();
        offset = offset % (2 * (renderItemWidth + columnGap));
        const x = columnIndex * (renderItemWidth + columnGap) + (rowIndex % 2 === 0 ? 1 : -1) * offset;
        const y = rowIndex * (renderItemHeight + rowGap);
        if ((columnIndex - rowIndex) % 2 === 0) {
          if (isDark.value) {
            ctx.fillStyle = "#191919";
          }
          else {
            ctx.fillStyle = "#efefef";
          }
          ctx.fillText(item, x, y);
        }
      }
    }
  },
});

const { render, setSize } = useBackmoji(canvasRef, renderer, {
  degree: -30,
  rowGap: 60,
  columnGap: 70,
});

function animationCb() {
  if (canvasRef.value) {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    render();
  }
}

setCallback(animationCb);

play();

useResizeObserver(document.body, (entries) => {
  if (canvasRef.value) {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      setSize(width, height);
      render();
    }
  }
});
</script>

<template>
  <canvas ref="canvasRef" class="fixed -z-1"></canvas>
</template>
