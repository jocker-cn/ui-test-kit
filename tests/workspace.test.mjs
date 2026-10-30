import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createProject, createRun } from '../scripts/workspace.mjs';

async function workspace(t) {
  const root = await mkdtemp(join(tmpdir(), 'ui-test-kit-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(new URL('../templates/', import.meta.url), join(root, 'templates'), { recursive: true });
  await createProject(root, 'sample');
  return root;
}

test('existing projects are never overwritten', async t => {
  const root = await workspace(t);
  await writeFile(join(root, 'projects/sample/project.md'), 'user content');
  await assert.rejects(createProject(root, 'sample'), { code: 'EEXIST' });
  assert.equal(await readFile(join(root, 'projects/sample/project.md'), 'utf8'), 'user content');
});

test('runs freeze the plan and project instructions and start unexecuted', async t => {
  const root = await workspace(t);
  await writeFile(join(root, 'projects/sample/plans/smoke.md'), '# 中文验收条件\n');
  const run = await createRun(root, 'sample', 'smoke');
  await writeFile(join(root, 'projects/sample/plans/smoke.md'), '# changed');
  assert.equal(await readFile(join(run, 'plan.md'), 'utf8'), '# 中文验收条件\n');
  assert.equal(await readFile(join(run, 'project.md'), 'utf8'), await readFile(join(root, 'projects/sample/project.md'), 'utf8'));
  assert.match(await readFile(join(run, 'report.md'), 'utf8'), /总体状态：NOT_RUN/);
  assert.deepEqual(await readdir(join(run, 'screenshots')), []);
});

test('rapid reruns have separate directories and preserve previous evidence', async t => {
  const root = await workspace(t);
  const first = await createRun(root, 'sample', 'smoke');
  await writeFile(join(first, 'report.md'), 'previous result');
  const second = await createRun(root, 'sample', 'smoke');
  assert.notEqual(first, second);
  assert.equal(await readFile(join(first, 'report.md'), 'utf8'), 'previous result');
});

test('ad hoc runs do not require a saved plan', async t => {
  const root = await workspace(t);
  const run = await createRun(root, 'sample');
  assert.match(await readFile(join(run, 'plan.md'), 'utf8'), /Ad hoc UI test/);
});

test('missing plan does not leave a phantom run', async t => {
  const root = await workspace(t);
  await assert.rejects(createRun(root, 'sample', 'missing'), { code: 'ENOENT' });
  await assert.rejects(readdir(join(root, 'runs')), { code: 'ENOENT' });
});

test('invalid project or plan paths cannot escape their directories', async t => {
  const root = await workspace(t);
  await assert.rejects(createProject(root, '../outside'));
  await assert.rejects(createRun(root, 'sample', '../project'));
  await assert.rejects(createRun(root, 'sample', 'C:\\secret'));
});
