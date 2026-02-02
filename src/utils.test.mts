import { jest } from '@jest/globals';

const mockedOs = {
  platform: jest.fn(),
  arch: jest.fn(),
};

jest.unstable_mockModule('node:os', () => mockedOs);

const { getBinaryPath, getDownloadObject } = await import('./utils.js');

const platforms: NodeJS.Platform[] = ['darwin', 'linux', 'win32'];
const architectures = ['arm', 'x32', 'x64'] as NodeJS.Architecture[];

const table = platforms.reduce(
  (testSuites, platform) => [
    ...testSuites,
    ...architectures.map(
      (arch) => [platform, arch] as [NodeJS.Platform, NodeJS.Architecture],
    ),
  ],
  [] as [NodeJS.Platform, NodeJS.Architecture][],
);

describe('getDownloadObject', () => {
  describe.each(table)('when OS is %p and arch is %p', (os, arch) => {
    const version = '2.27.0';

    beforeEach(() => {
      jest.resetAllMocks();
      mockedOs.platform.mockReturnValueOnce(os);
      mockedOs.arch.mockReturnValueOnce(arch);
    });

    it('gets download object', () => {
      expect(getDownloadObject(version)).toMatchSnapshot();
    });
  });
});

describe('getBinaryPath', () => {
  describe.each(platforms)('when platform is %p', (platform) => {
    beforeEach(() => {
      jest.resetAllMocks();
      mockedOs.platform.mockReturnValueOnce(platform);
    });

    it('returns CLI filepath', () => {
      const directory = 'directory';
      const name = 'name';
      expect(getBinaryPath(directory, name)).toMatchSnapshot();
    });
  });
});
