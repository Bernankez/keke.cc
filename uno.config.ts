import { defineConfig, presetIcons, presetUno, transformerDirectives } from "unocss";
import { colorBackground, colorDarkBackground, colorDarkDefault, colorDefault, colorDisabled, colorPrimaryRed as colorPrimary } from "@bernankez/theme";

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
