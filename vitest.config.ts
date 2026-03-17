import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import path from 'path';

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
      '@test-setup': path.resolve(__dirname, './src/setup-vitest.ts'),
      '@base': path.resolve(__dirname, './src/app/base'),
      '@data': path.resolve(__dirname, './src/app/data'),
      '@core': path.resolve(__dirname, './src/app/core'),
      '@domain': path.resolve(__dirname, './src/app/domain'),
      '@presentation': path.resolve(__dirname, './src/app/presentation'),
      '@environments': path.resolve(__dirname, './src/environments'),
    },
  },
});
