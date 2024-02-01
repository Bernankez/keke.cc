/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import UnoCSS from "unocss/vite";
import DevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      deep: true,
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
      ],
      dirs: [
        "./src/composables/**",
        "./src/components/**/use*.ts",
        "!*.test.ts",
      ],
      vueTemplate: true,
    }),
    UnoCSS(),
    DevTools(),
    basicSsl(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "~": resolve(__dirname, "."),
    },
  },
  test: {
    environment: "happy-dom",
    passWithNoTests: true,
  },
});
