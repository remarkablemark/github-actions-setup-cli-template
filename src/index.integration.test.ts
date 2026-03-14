import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const nodePath = process.execPath;
const actionPath = resolve(__dirname, '../dist/index.js');
const tmpPath = resolve(__dirname, '../node_modules/.tmp');

describe('integration', () => {
  it('runs action', () => {
    const env = {
      'INPUT_CLI-NAME': 'gh',
      'INPUT_CLI-VERSION': '2.27.0',
      RUNNER_TOOL_CACHE: resolve(tmpPath, 'runner_tool_cache'),
      RUNNER_TEMP: resolve(tmpPath, 'runner_temp'),
    };

    const result = spawnSync(nodePath, [actionPath], {
      env,
      stdio: 'ignore', // 'inherit' to stream output in real-time
    });

    expect(result.status).toBe(0);
  });
});
