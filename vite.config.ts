/// <reference types="vitest" />
import { resolve } from "node:path";
import basicSsl from "@vitejs/plugin-basic-ssl";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";

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
        "@vueuse/math",
      ],
      dirs: [
        "./src/composables/**",
        "./src/components/**/use*.ts",
        "!*.test.ts",
      ],
      vueTemplate: true,
    }),
    UnoCSS(),
    VueDevTools(),
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
