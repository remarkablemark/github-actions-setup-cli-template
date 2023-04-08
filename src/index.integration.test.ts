import { execFileSync } from 'child_process';
import { resolve } from 'path';

const nodePath = process.execPath;
const actionPath = resolve(__dirname, '../dist/index.js');

it('runs action', () => {
  const version = '1.2.3';
  process.env.INPUT_VERSION = version;
  const buffer = execFileSync(nodePath, [actionPath], {
    env: process.env,
  });
  expect(buffer.toString()).toContain(`::debug::version: ${version}`);
});
