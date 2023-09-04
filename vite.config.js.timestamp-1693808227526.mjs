// vite.config.js
import { defineConfig } from "file:///D:/01programming/2023-web-layout/hex2023-2/project-code/node_modules/vite/dist/node/index.js";
import { ViteEjsPlugin } from "file:///D:/01programming/2023-web-layout/hex2023-2/project-code/node_modules/vite-plugin-ejs/index.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { glob } from "file:///D:/01programming/2023-web-layout/hex2023-2/project-code/node_modules/glob/dist/mjs/index.js";
import liveReload from "file:///D:/01programming/2023-web-layout/hex2023-2/project-code/node_modules/vite-plugin-live-reload/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/01programming/2023-web-layout/hex2023-2/project-code/vite.config.js";
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
        }
      }
    }
  };
}
var vite_config_default = defineConfig({
  // base 的寫法：
  // base: '/Repository 的名稱/'
  base: "/project-code/",
  plugins: [
    liveReload(["./layout/**/*.ejs", "./pages/**/*.ejs", "./pages/**/*.html"]),
    ViteEjsPlugin(),
    moveOutputPlugin()
  ],
  server: {
    // 啟動 server 時預設開啟的頁面
    open: "pages/index.html"
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync("pages/**/*.html").map((file) => [
          path.relative(
            "pages",
            file.slice(0, file.length - path.extname(file).length)
          ),
          fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
        ])
      )
    },
    outDir: "dist"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwwMXByb2dyYW1taW5nXFxcXDIwMjMtd2ViLWxheW91dFxcXFxoZXgyMDIzLTJcXFxccHJvamVjdC1jb2RlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwwMXByb2dyYW1taW5nXFxcXDIwMjMtd2ViLWxheW91dFxcXFxoZXgyMDIzLTJcXFxccHJvamVjdC1jb2RlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8wMXByb2dyYW1taW5nLzIwMjMtd2ViLWxheW91dC9oZXgyMDIzLTIvcHJvamVjdC1jb2RlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgVml0ZUVqc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1lanNcIjtcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJub2RlOnVybFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XHJcbmltcG9ydCB7IGdsb2IgfSBmcm9tIFwiZ2xvYlwiO1xyXG5cclxuaW1wb3J0IGxpdmVSZWxvYWQgZnJvbSBcInZpdGUtcGx1Z2luLWxpdmUtcmVsb2FkXCI7XHJcblxyXG5mdW5jdGlvbiBtb3ZlT3V0cHV0UGx1Z2luKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRuYW1lOiBcIm1vdmUtb3V0cHV0XCIsXHJcblx0XHRlbmZvcmNlOiBcInBvc3RcIixcclxuXHRcdGFwcGx5OiBcImJ1aWxkXCIsXHJcblx0XHRhc3luYyBnZW5lcmF0ZUJ1bmRsZShvcHRpb25zLCBidW5kbGUpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBmaWxlTmFtZSBpbiBidW5kbGUpIHtcclxuXHRcdFx0XHRpZiAoZmlsZU5hbWUuc3RhcnRzV2l0aChcInBhZ2VzL1wiKSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgbmV3RmlsZU5hbWUgPSBmaWxlTmFtZS5zbGljZShcInBhZ2VzL1wiLmxlbmd0aCk7XHJcblx0XHRcdFx0XHRidW5kbGVbZmlsZU5hbWVdLmZpbGVOYW1lID0gbmV3RmlsZU5hbWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0Ly8gYmFzZSBcdTc2ODRcdTVCRUJcdTZDRDVcdUZGMUFcclxuXHQvLyBiYXNlOiAnL1JlcG9zaXRvcnkgXHU3Njg0XHU1NDBEXHU3QTMxLydcclxuXHRiYXNlOiBcIi9wcm9qZWN0LWNvZGUvXCIsXHJcblx0cGx1Z2luczogW1xyXG5cdFx0bGl2ZVJlbG9hZChbXCIuL2xheW91dC8qKi8qLmVqc1wiLCBcIi4vcGFnZXMvKiovKi5lanNcIiwgXCIuL3BhZ2VzLyoqLyouaHRtbFwiXSksXHJcblx0XHRWaXRlRWpzUGx1Z2luKCksXHJcblx0XHRtb3ZlT3V0cHV0UGx1Z2luKCksXHJcblx0XSxcclxuXHRzZXJ2ZXI6IHtcclxuXHRcdC8vIFx1NTU1Rlx1NTJENSBzZXJ2ZXIgXHU2NjQyXHU5ODEwXHU4QTJEXHU5NThCXHU1NTVGXHU3Njg0XHU5ODAxXHU5NzYyXHJcblx0XHRvcGVuOiBcInBhZ2VzL2luZGV4Lmh0bWxcIixcclxuXHR9LFxyXG5cdGJ1aWxkOiB7XHJcblx0XHRyb2xsdXBPcHRpb25zOiB7XHJcblx0XHRcdGlucHV0OiBPYmplY3QuZnJvbUVudHJpZXMoXHJcblx0XHRcdFx0Z2xvYlxyXG5cdFx0XHRcdFx0LnN5bmMoXCJwYWdlcy8qKi8qLmh0bWxcIilcclxuXHRcdFx0XHRcdC5tYXAoKGZpbGUpID0+IFtcclxuXHRcdFx0XHRcdFx0cGF0aC5yZWxhdGl2ZShcclxuXHRcdFx0XHRcdFx0XHRcInBhZ2VzXCIsXHJcblx0XHRcdFx0XHRcdFx0ZmlsZS5zbGljZSgwLCBmaWxlLmxlbmd0aCAtIHBhdGguZXh0bmFtZShmaWxlKS5sZW5ndGgpXHJcblx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdGZpbGVVUkxUb1BhdGgobmV3IFVSTChmaWxlLCBpbXBvcnQubWV0YS51cmwpKSxcclxuXHRcdFx0XHRcdF0pXHJcblx0XHRcdCksXHJcblx0XHR9LFxyXG5cdFx0b3V0RGlyOiBcImRpc3RcIixcclxuXHR9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVyxTQUFTLG9CQUFvQjtBQUM5WCxTQUFTLHFCQUFxQjtBQUM5QixTQUFTLHFCQUFxQjtBQUM5QixPQUFPLFVBQVU7QUFDakIsU0FBUyxZQUFZO0FBRXJCLE9BQU8sZ0JBQWdCO0FBTndNLElBQU0sMkNBQTJDO0FBUWhSLFNBQVMsbUJBQW1CO0FBQzNCLFNBQU87QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQLE1BQU0sZUFBZSxTQUFTLFFBQVE7QUFDckMsaUJBQVcsWUFBWSxRQUFRO0FBQzlCLFlBQUksU0FBUyxXQUFXLFFBQVEsR0FBRztBQUNsQyxnQkFBTSxjQUFjLFNBQVMsTUFBTSxTQUFTLE1BQU07QUFDbEQsaUJBQU8sUUFBUSxFQUFFLFdBQVc7QUFBQSxRQUM3QjtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNEO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQTtBQUFBLEVBRzNCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNSLFdBQVcsQ0FBQyxxQkFBcUIsb0JBQW9CLG1CQUFtQixDQUFDO0FBQUEsSUFDekUsY0FBYztBQUFBLElBQ2QsaUJBQWlCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLFFBQVE7QUFBQTtBQUFBLElBRVAsTUFBTTtBQUFBLEVBQ1A7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNOLGVBQWU7QUFBQSxNQUNkLE9BQU8sT0FBTztBQUFBLFFBQ2IsS0FDRSxLQUFLLGlCQUFpQixFQUN0QixJQUFJLENBQUMsU0FBUztBQUFBLFVBQ2QsS0FBSztBQUFBLFlBQ0o7QUFBQSxZQUNBLEtBQUssTUFBTSxHQUFHLEtBQUssU0FBUyxLQUFLLFFBQVEsSUFBSSxFQUFFLE1BQU07QUFBQSxVQUN0RDtBQUFBLFVBQ0EsY0FBYyxJQUFJLElBQUksTUFBTSx3Q0FBZSxDQUFDO0FBQUEsUUFDN0MsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNEO0FBQUEsSUFDQSxRQUFRO0FBQUEsRUFDVDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
