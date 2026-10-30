import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './projects',
  testMatch: '**/tests/**/*.spec.ts',
  timeout: 150_000,
  expect: { timeout: 10_000 },
  workers: 1,
  retries: 0,
  outputDir: 'test-results',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    browserName: 'chromium',
    viewport: { width: 1440, height: 900 },
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    trace: 'off',
    video: 'off',
    ...(process.env.UI_TEST_STORAGE_STATE
      ? { storageState: process.env.UI_TEST_STORAGE_STATE }
      : {}),
  },
});
