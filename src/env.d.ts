/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare global {
  interface Window {
    Alpine: import("alpinejs").Alpine;
  }
}
