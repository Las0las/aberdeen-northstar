import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/__tests__/**/*.test.ts', 'src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/server/**', 'src/db/**', 'src/app/api/**'],
      exclude: ['**/__tests__/**', '**/*.test.ts'],
      reporter: ['text', 'lcov'],
    },
  },
});
