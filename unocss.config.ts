import { defineConfig, presetIcons, presetUno, transformerDirectives } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";
import { colorBackground, colorDarkBackground, colorDarkDefault, colorDefault, colorDisabled, colorPrimaryRed as colorPrimary } from "@bernankez/theme";

export default defineConfig({
  presets: [presetUno(), presetRemToPx(), presetIcons()],
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
