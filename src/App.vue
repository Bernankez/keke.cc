<template>
  <Layout />
</template>

<script setup lang="ts">
import useBlobity from "blobity/lib/vue/useBlobity";
import { colorPrimaryRed } from "@bernankez/theme";
import Layout from "@/layout/index.vue";
import "@unocss/reset/tailwind.css";

useBlobity({
  licenseKey: "Bernankez",
  dotColor: colorPrimaryRed.DEFAULT,
  // dotColor: "#ffffff00",
  radius: 10,
  mode: "normal",
  magnetic: false,
  invert: true,
});
</script>
