import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { glob } from "glob";
import liveReload from "vite-plugin-live-reload";
import copy from "rollup-plugin-copy";

function moveOutputPlugin() {
  return {
    name: "move-output",
    enforce: "post",
    apply: "build",
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith("pages/")) {
          const newFileName = fileName.slice("pages/".length);
          bundle[fileName].fileName = newFileName;
          console.log("newFileName", newFileName);
        }
      }
    },
  };
}
moveOutputPlugin();

export default defineConfig({
  // base 的寫法：
  // base: '/Repository 的名稱/'
  base: "/project-code/",
  plugins: [
    liveReload(["./layout/**/*.ejs", "./pages/**/*.ejs", "./pages/**/*.html"]),
    ViteEjsPlugin(),
    moveOutputPlugin(),
    copy({
      targets: [
        { src: "assets/**/*.js", dest: "dist/assets/js/" },
        {
          src: "assets/images/**",
          dest: "dist/assets/images",
        },
      ],
      hook: "writeBundle",
    }),
  ],
  server: {
    // 啟動 server 時預設開啟的頁面
    open: "pages/index.html",
  },
  build: {
    rollupOptions: {
      output: {
        format: "es",
      },
      input: Object.fromEntries(
        glob
          .sync("pages/**/*.html")
          .map((file) => [
            path.relative(
              "pages",
              file.slice(0, file.length - path.extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
    },
    outDir: "dist",
  },
  define: {
    // _url: '"https://project-code-json-k0ti.onrender.com"',
    _url: '"http://localhost:3000"',
  },
});
