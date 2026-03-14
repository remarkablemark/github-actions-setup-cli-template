import { spawnSync } from 'node:child_process';
import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, expect, it } from 'vitest';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const nodePath = process.execPath;
const actionPath = resolve(__dirname, '../dist/index.js');
const tmpPath = resolve(__dirname, '../node_modules/.tmp');
const runnerToolCachePath = resolve(tmpPath, 'runner_tool_cache');
const runnerTempPath = resolve(tmpPath, 'runner_temp');

afterAll(async () => {
  await Promise.all(
    [runnerToolCachePath, runnerTempPath].map((path) =>
      rm(path, { recursive: true, force: true }),
    ),
  );
});

it('runs action', () => {
  const result = spawnSync(nodePath, [actionPath], {
    env: {
      ...process.env,
      'INPUT_CLI-NAME': 'gh',
      'INPUT_CLI-VERSION': '2.27.0',
      RUNNER_TOOL_CACHE: runnerToolCachePath,
      RUNNER_TEMP: runnerTempPath,
    },
    stdio: 'pipe',
  });

  if (result.status !== 0) {
    /* eslint-disable no-console */
    console.error('stdout:', result.stdout?.toString());
    console.error('stderr:', result.stderr?.toString());
    /* eslint-enable no-console */
  }

  expect(result.status).toBe(0);
});
