import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/app/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      include: ["src/app/**"],
    },
  },
});
