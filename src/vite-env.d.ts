/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

export {}

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    RouterLink: typeof import("vue-router")["RouterLink"]
    RouterView: typeof import("vue-router")["RouterView"]
  }
}