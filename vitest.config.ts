import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setup-vitest.ts'],
    include: ['src/**/*.spec.ts'],
    exclude: ['node_modules', 'dist', 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setup-vitest.ts',
        '**/*.spec.ts',
        '**/main.ts',
        '**/environments/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@test-setup': '/src/setup-vitest.ts',
    },
  },
});
