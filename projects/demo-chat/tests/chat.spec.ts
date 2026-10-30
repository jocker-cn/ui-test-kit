import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

async function evidence(page: import('@playwright/test').Page, filename: string) {
  const directory = resolve(process.env.UI_TEST_RUN_DIR || 'test-results/demo-chat', 'screenshots');
  await mkdir(directory, { recursive: true });
  await page.screenshot({ path: join(directory, filename) });
}

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:4173');
});

test('TC-01: sending, loading and completed reply', async ({ page }) => {
  await page.getByRole('textbox', { name: '消息' }).fill('你好');
  await page.getByRole('button', { name: '发送', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('正在生成');
  await expect(page.getByRole('button', { name: '发送', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: '停止生成' })).toBeVisible();
  await evidence(page, 'TC-01-loading.png');
  await expect(page.getByTestId('reply-text')).toHaveText('模拟回复：你好');
  await expect(page.getByRole('status')).toHaveText('生成完成');
  await expect(page.getByRole('button', { name: '停止生成' })).toBeHidden();
  await expect(page.getByRole('button', { name: '复制回复' })).toBeVisible();
  await evidence(page, 'TC-01-completed.png');
});

test('TC-02: stopping prevents a delayed reply', async ({ page }) => {
  await page.clock.install();
  await page.getByRole('textbox', { name: '消息' }).fill('停止测试');
  await page.getByRole('button', { name: '发送', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('正在生成');
  await page.getByRole('button', { name: '停止生成' }).click();
  await expect(page.getByRole('button', { name: '发送', exact: true })).toBeEnabled();
  // Advance beyond the fixture's timer; this verifies no late completion after cancellation.
  await page.clock.runFor(2500);
  await expect(page.getByRole('status')).toHaveText('已停止');
  await expect(page.getByTestId('reply-text')).toBeEmpty();
  await evidence(page, 'TC-02-stopped.png');
});

test('TC-03: copying writes the exact reply to the clipboard', async ({ page }) => {
  await page.getByRole('textbox', { name: '消息' }).fill('复制测试');
  await page.getByRole('button', { name: '发送', exact: true }).click();
  await expect(page.getByTestId('reply-text')).toHaveText('模拟回复：复制测试');
  await page.getByRole('button', { name: '复制回复' }).click();
  await expect(page.getByRole('status')).toHaveText('已复制');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('模拟回复：复制测试');
  await evidence(page, 'TC-03-copied.png');
});
