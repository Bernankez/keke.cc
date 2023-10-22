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
    vue({
      script: {
        defineModel: true,
      },
    }),
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
  server: {
    https: true,
    watch: {
      usePolling: true,
    },
  },
  test: {
    environment: "happy-dom",
    passWithNoTests: true,
  },
});
