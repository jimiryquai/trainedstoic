// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";

// https://astro.build/config
export default defineConfig({
  site: 'https://trainedstoic.com',
  output: "server",
  integrations: [react(), keystatic(), tailwind()],
  // This makes it where `/admin` and `/admin/` both work.
  trailingSlash: "ignore",
  adapter: netlify()
});
