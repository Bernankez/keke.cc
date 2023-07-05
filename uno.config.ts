import { defineConfig, presetIcons, presetUno, transformerDirectives } from "unocss";
import { colorBackground, colorDarkBackground, colorDarkDefault, colorDefault, colorDisabled, colorPrimaryRed as colorPrimary } from "@bernankez/theme";
/* eslint-disable unused-imports/no-unused-imports */
import type { UserConfig } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  theme: {
    colors: {
      default: colorDefault,
      darkdefault: colorDarkDefault,
      disabled: colorDisabled,
      background: colorBackground,
      darkbackground: colorDarkBackground,
      primary: colorPrimary,
    },
  },
  transformers: [transformerDirectives()],
});
