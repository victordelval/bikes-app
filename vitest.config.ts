import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "src/app/**/*.test.tsx",
      "src/components/**/*.test.tsx",
      "src/lib/ui/**/*.test.tsx",
    ],
    coverage: {
      provider: "v8",
      include: ["src/app/**", "src/components/**", "src/lib/ui/**"],
    },
  },
});
