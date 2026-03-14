import type { arch, platform } from 'node:os';

import type { addPath, getInput, setFailed } from '@actions/core';
import type { exec } from '@actions/exec';
import type {
  cacheFile,
  downloadTool,
  extractTar,
  extractZip,
  find,
} from '@actions/tool-cache';
import type { MockedFunction } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockedCore = {
  getInput: vi.fn() as MockedFunction<typeof getInput>,
  addPath: vi.fn() as MockedFunction<typeof addPath>,
  setFailed: vi.fn() as MockedFunction<typeof setFailed>,
};

const mockedExec = {
  exec: vi.fn() as MockedFunction<typeof exec>,
};

const mockedTc = {
  downloadTool: vi.fn() as MockedFunction<typeof downloadTool>,
  extractTar: vi.fn() as MockedFunction<typeof extractTar>,
  extractZip: vi.fn() as MockedFunction<typeof extractZip>,
  cacheFile: vi.fn() as MockedFunction<typeof cacheFile>,
  find: vi.fn() as MockedFunction<typeof find>,
};

const mockedOs = {
  platform: vi.fn() as MockedFunction<typeof platform>,
  arch: vi.fn() as MockedFunction<typeof arch>,
};

vi.mock('@actions/core', () => mockedCore);
vi.mock('@actions/exec', () => mockedExec);
vi.mock('@actions/tool-cache', () => mockedTc);
vi.mock('node:os', () => mockedOs);

const { run } = await import('./index.js');

beforeEach(() => {
  vi.resetAllMocks();
});

const cliName = 'cli-name';
const cliVersion = '1.2.3';
const pathToTarball = 'path/to/tarball';
const pathToCLI = 'path/to/cli';
const platforms = ['darwin', 'win32', 'linux'];

describe.each(platforms)('when platform is %p', (platform) => {
  beforeEach(() => {
    mockedOs.platform.mockReturnValue(platform as NodeJS.Platform);
    mockedOs.arch.mockReturnValue('arm64' as NodeJS.Architecture);

    mockedCore.getInput.mockImplementation((input) => {
      switch (input) {
        case 'cli-version':
          return cliVersion;
        case 'cli-name':
          return cliName;
        default:
          throw Error(`Invalid input: ${input}`);
      }
    });
  });

  it('downloads, extracts, and adds CLI to PATH', async () => {
    mockedTc.downloadTool.mockResolvedValueOnce(pathToTarball);
    const isWin32 = platform === 'win32';
    const extract = isWin32 ? mockedTc.extractZip : mockedTc.extractTar;
    extract.mockResolvedValueOnce(pathToCLI);

    await run();

    expect(mockedTc.downloadTool).toHaveBeenCalledWith(
      expect.stringContaining(
        `https://github.com/cli/cli/releases/download/v${cliVersion}/gh_${cliVersion}_`,
      ),
    );

    expect(extract).toHaveBeenCalledWith(pathToTarball);

    expect(mockedExec.exec).toHaveBeenCalledWith('mv', [
      expect.stringContaining('/bin/gh'),
      expect.stringContaining(`/bin/${cliName}`),
    ]);

    expect(mockedTc.cacheFile).toHaveBeenCalledWith(
      expect.stringContaining(`/bin/${cliName}`),
      isWin32 ? `${cliName}.exe` : cliName,
      cliName,
      cliVersion,
    );

    expect(mockedCore.addPath).toHaveBeenCalledWith(
      expect.stringContaining(pathToCLI),
    );
  });
});

describe('error', () => {
  it('throws error', async () => {
    const message = 'error';
    mockedCore.getInput.mockImplementationOnce(() => {
      throw new Error(message);
    });
    await run();
    expect(mockedCore.setFailed).toHaveBeenCalledWith(message);
  });
});
