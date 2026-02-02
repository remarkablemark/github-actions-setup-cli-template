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
import { jest } from '@jest/globals';

const mockedCore: {
  getInput: jest.MockedFunction<typeof getInput>;
  addPath: jest.MockedFunction<typeof addPath>;
  setFailed: jest.MockedFunction<typeof setFailed>;
} = {
  getInput: jest.fn(),
  addPath: jest.fn(),
  setFailed: jest.fn(),
};

const mockedExec: {
  exec: jest.MockedFunction<typeof exec>;
} = {
  exec: jest.fn(),
};

const mockedTc: {
  downloadTool: jest.MockedFunction<typeof downloadTool>;
  extractTar: jest.MockedFunction<typeof extractTar>;
  extractZip: jest.MockedFunction<typeof extractZip>;
  cacheFile: jest.MockedFunction<typeof cacheFile>;
  find: jest.MockedFunction<typeof find>;
} = {
  downloadTool: jest.fn(),
  extractTar: jest.fn(),
  extractZip: jest.fn(),
  cacheFile: jest.fn(),
  find: jest.fn(),
};

const mockedOs: {
  platform: jest.MockedFunction<typeof platform>;
  arch: jest.MockedFunction<typeof arch>;
} = {
  platform: jest.fn(),
  arch: jest.fn(),
};

jest.unstable_mockModule('@actions/core', () => mockedCore);
jest.unstable_mockModule('@actions/exec', () => mockedExec);
jest.unstable_mockModule('@actions/tool-cache', () => mockedTc);
jest.unstable_mockModule('node:os', () => mockedOs);

const { run } = await import('./index.js');

beforeEach(() => {
  jest.resetAllMocks();
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
