import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const basePath = env.VITE_BASE_PATH || "/";
  const isProd = mode === "production";

  return mergeConfig(
    defineConfig({
      base: isProd ? basePath : "/",
      build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, "index.html"),
            hash: resolve(__dirname, "index.hash.html"),
            404: resolve(__dirname, "404.html"),
          },
        },
      },
      esbuild: {
        jsxFactory: "createVNode",
      },
      optimizeDeps: {
        esbuildOptions: {
          jsx: "transform",
          jsxFactory: "createVNode",
        },
      },
    }),
    defineTestConfig({
      test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.js",
        exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
      },
    }),
  );
});
