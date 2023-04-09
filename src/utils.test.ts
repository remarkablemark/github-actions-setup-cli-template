import os from 'os';

import { getDownloadObject } from './utils';

jest.mock('os');
const mockedOs = jest.mocked(os);

const platforms = ['darwin', 'linux', 'win32'];
const architectures = ['arm', 'x32', 'x64'];

const table = platforms.reduce(
  (testSuites, os) => [
    ...testSuites,
    ...architectures.map((arch) => [os, arch] as [string, string]),
  ],
  [] as [string, string][]
);

describe.each(table)('when OS is %p and arch is %p', (os, arch) => {
  const version = '2.27.0';

  beforeEach(() => {
    jest.resetAllMocks();
    mockedOs.platform.mockReturnValueOnce(os as NodeJS.Platform);
    mockedOs.arch.mockReturnValueOnce(arch);
  });

  it('gets download object', () => {
    expect(getDownloadObject(version)).toMatchSnapshot();
  });
});
