import os from 'node:os';

import { getBinaryPath, getDownloadObject } from './utils';

jest.mock('node:os');
const mockedOs = jest.mocked(os);

const platforms: NodeJS.Platform[] = ['darwin', 'linux', 'win32'];
const architectures = ['arm', 'x32', 'x64'] as NodeJS.Architecture[];

const table = platforms.reduce(
  (testSuites, os) => [
    ...testSuites,
    ...architectures.map(
      (arch) => [os, arch] as [NodeJS.Platform, NodeJS.Architecture],
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
  describe.each(platforms)('when OS is %p', (os) => {
    beforeEach(() => {
      jest.resetAllMocks();
      mockedOs.platform.mockReturnValueOnce(os);
    });

    it('returns CLI filepath', () => {
      const directory = 'directory';
      const name = 'name';
      expect(getBinaryPath(directory, name)).toMatchSnapshot();
    });
  });
});
