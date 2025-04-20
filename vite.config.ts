import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import { resolve } from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    {
      name: "copy-htaccess",
      closeBundle() {
        // Path to your .htaccess file
        const htaccessPath = resolve(__dirname, ".htaccess");
        // Destination path in dist directory
        const distHtaccessPath = resolve(__dirname, "dist", ".htaccess");

        // Copy the .htaccess file to the dist directory
        if (fs.existsSync(htaccessPath)) {
          fs.copyFileSync(htaccessPath, distHtaccessPath);
          console.log(".htaccess file copied to dist directory");
        } else {
          console.warn(".htaccess file not found at project root");
        }
      },
    },
  ],
  assetsInclude: ["**/*.md"],
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: ["buffer"],
  },
});
