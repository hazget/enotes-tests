import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  use: {
    baseURL: 'https://enotes.pointschool.ru',
  },
});