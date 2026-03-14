import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  minify: true,
  target: 'node24',
  noExternal: [/./],
});
