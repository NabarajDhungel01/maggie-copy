// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import icon from "astro-icon";
import partytown from "@astrojs/partytown";
import { remarkWikiLink } from "./src/plugins/remark-wiki-link";

// Get the repo name (e.g., 'maggie-copy') from the GitHub URL
const BASE_PATH = "/maggie-copy"; // Change this to match your repo name

export default defineConfig({
  site: "https://NabarajDhungel01.github.io/maggie-copy",
  base: BASE_PATH, // ✅ Required for GitHub Pages
  output: "static", // ✅ Required for GitHub Pages (Static Site)
  trailingSlash: "always", // ✅ Ensures URLs work on GitHub Pages

  integrations: [
    mdx({
      remarkPlugins: [remarkWikiLink],
      shikiConfig: {
        theme: "night-owl",
        wrap: true,
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    react(),
    icon(),
    {
      name: "astro-embed",
      options: {
        twitter: { fetch: false }, // ✅ Prevents Astro-Embed from fetching tweets
      },
    },
  ],

  vite: {
    build: {
      outDir: "dist", 
    },
    define: {
      global: false, // ✅ Fixes build issue related to global variables
    },
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"], // ✅ Ensures images load properly
  },

  markdown: {
    extendDefaultPlugins: true,
  },
});