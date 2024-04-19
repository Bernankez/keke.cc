// TODO chroma
// TODO change background pattern
// import type { Color, Oklch, Rgb } from "culori/fn";
// import { clampChroma, modeOklch, modeRgb, useMode } from "culori/fn";

// export function toRgb(color: Color): Rgb {
//   const rgb = useMode(modeRgb);
//   return rgb(clampChroma(color, "oklch"));
// }

// export function build(l: number, c: number, h: number, alpha = 1): AnyLch {
//   return { alpha, c, h, l, mode: "oklch" };
// }

// export function valueToColor(value: LchValue): Oklch {
//   return build((L_MAX * value.l) / 100, value.c, value.h, value.a / 100);
// }

// export function colorToValue(color: Oklch): LchValue {
//   return {
//     a: (color.alpha ?? 1) * 100,
//     c: color.c,
//     h: color.h ?? 0,
//     l: (100 * color.l) / L_MAX,
//   };
// }

// export function oklch(color: string) {
//   const _oklch = useMode(modeOklch);

//   const c = _oklch(color);

//   function darker() {
//     _oklch(color);
//   }

//   return {};
// }
