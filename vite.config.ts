import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import obfuscator from "rollup-plugin-obfuscator";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 23519,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "vue-i18n",
        replacement: "vue-i18n/dist/vue-i18n.cjs.js",
      },
    ],
  },
  build: {
    chunkSizeWarningLimit: 3000,
    /*rollupOptions: {
      output: {
        plugins: [obfuscator({})],
      },
    }, */
  },
});
