import { mkdir, readFile, writeFile, realpath } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function slug(value, kind) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value ?? '') || value.length > 64) {
    throw new Error(`${kind} must use lowercase letters, digits and hyphens (max 64 characters).`);
  }
  return value;
}

function render(text, values) {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => values[key] ?? match);
}

async function template(root, name, values) {
  return render(await readFile(join(root, 'templates', `${name}.md`), 'utf8'), values);
}

export async function createProject(root, name) {
  const project = slug(name, 'Project');
  const directory = join(root, 'projects', project);
  const projectText = await template(root, 'project', { project });
  const plan = await template(root, 'plan', { title: 'Smoke test' });
  await mkdir(join(root, 'projects'), { recursive: true });
  await mkdir(directory); // Deliberately fail rather than overwrite an existing project.
  await mkdir(join(directory, 'plans'));
  await writeFile(join(directory, 'project.md'), projectText, { encoding: 'utf8', flag: 'wx' });
  await writeFile(join(directory, 'plans', 'smoke.md'), plan, { encoding: 'utf8', flag: 'wx' });
  return directory;
}

export async function createRun(root, name, planName) {
  const project = slug(name, 'Project');
  const projectDirectory = join(root, 'projects', project);
  const projectText = await readFile(join(projectDirectory, 'project.md'), 'utf8');
  const title = planName === undefined ? 'Ad hoc UI test' : slug(planName, 'Plan');
  const plan = planName === undefined
    ? await template(root, 'plan', { title })
    : await readFile(join(projectDirectory, 'plans', `${title}.md`), 'utf8');
  const createdAt = new Date().toISOString();
  const runId = `${createdAt.replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z')}-${randomUUID().slice(0, 8)}`;
  const directory = join(root, 'runs', project, runId);
  const source = planName === undefined ? '用户临时描述（待填写）' : `projects/${project}/plans/${title}.md`;
  const report = await template(root, 'report', { title, project, runId, source, createdAt });
  await mkdir(join(root, 'runs', project), { recursive: true });
  await mkdir(directory);
  await mkdir(join(directory, 'screenshots'));
  for (const [name, content] of Object.entries({ 'plan.md': plan, 'project.md': projectText, 'report.md': report })) {
    await writeFile(join(directory, name), content, { encoding: 'utf8', flag: 'wx' });
  }
  return directory;
}

async function main() {
  const [command, project, plan, ...rest] = process.argv.slice(2);
  if (rest.length || !project || (command === 'project' && plan) || !['project', 'run'].includes(command)) {
    throw new Error('Usage: npm run project:new -- <project> | npm run run:new -- <project> [plan]');
  }
  const directory = command === 'project'
    ? await createProject(repository, project)
    : await createRun(repository, project, plan);
  console.log(directory);
  console.log(command === 'project' ? 'Fill project.md and plans/smoke.md before testing.' : 'Created only; tests have NOT run. Fill plan.md and report.md during execution.');
}

if (process.argv[1] && await realpath(process.argv[1]) === await realpath(fileURLToPath(import.meta.url))) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
