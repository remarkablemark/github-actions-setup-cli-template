import os from 'node:os';
import path from 'node:path';

const ARCHITECTURE = {
  arm: 'arm',
  arm64: 'arm64',
  x32: '386',
  x64: 'amd64',
} as const;

/**
 * Gets the operating system CPU architecture.
 *
 * @see {@link https://nodejs.org/api/os.html#os_os_arch}
 *
 * @param arch - Arch in [arm, arm64, x32, x64...]
 * @returns - Return value in [arm, arm64, 386, amd64]
 */
function getArch(arch: NodeJS.Architecture) {
  return ARCHITECTURE[arch as keyof typeof ARCHITECTURE] || arch;
}

const PLATFORM = {
  darwin: 'macOS',
  linux: 'linux',
  win32: 'windows',
} as const;

/**
 * Gets a string identifying the operating system platform.
 *
 * @see {@link https://nodejs.org/api/os.html#os_os_platform}
 *
 * @param os - OS in [darwin, linux, win32...]
 * @returns - Return value in [macOS, linux, windows]
 */
function getOS(os: NodeJS.Platform) {
  return PLATFORM[os as keyof typeof PLATFORM] || os;
}

/**
 * Gets download object.
 *
 * @see {@link https://github.com/cli/cli/releases}
 *
 * @param version - CLI version
 * @returns - URL and binary path
 */
export function getDownloadObject(version: string) {
  const platform = os.platform();
  const arch = os.arch() as NodeJS.Architecture;

  const filename = `gh_${version}_${getOS(platform)}_${getArch(arch)}`;
  const extension = platform === 'win32' ? 'zip' : 'tar.gz';

  return {
    binaryDirectory: platform === 'win32' ? 'bin' : path.join(filename, 'bin'),
    url: `https://github.com/cli/cli/releases/download/v${version}/${filename}.${extension}`,
  };
}

/**
 * Gets CLI path.
 *
 * @param directory - Directory
 * @param name - CLI name
 * @returns - Binary path
 */
export function getBinaryPath(directory: string, name: string) {
  return path.join(directory, name + (os.platform() === 'win32' ? '.exe' : ''));
}
