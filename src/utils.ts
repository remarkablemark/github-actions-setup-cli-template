import { arch, platform } from 'node:os';
import { join } from 'node:path';

enum Architecture {
  arm = 'arm',
  arm64 = 'arm64',
  x32 = '386',
  x64 = 'amd64',
}

/**
 * Gets the operating system CPU architecture.
 *
 * @see {@link https://nodejs.org/api/os.html#os_os_arch}
 *
 * @param arch - Arch in [arm, arm64, x32, x64...]
 * @returns - Return value in [arm, arm64, 386, amd64]
 */
function getArch(arch: NodeJS.Architecture) {
  return Architecture[arch as keyof typeof Architecture] || arch;
}

enum Platform {
  darwin = 'macOS',
  linux = 'linux',
  win32 = 'windows',
}

/**
 * Gets a string identifying the operating system platform.
 *
 * @see {@link https://nodejs.org/api/os.html#os_os_platform}
 *
 * @param os - OS in [darwin, linux, win32...]
 * @returns - Return value in [macOS, linux, windows]
 */
function getOS(os: NodeJS.Platform) {
  return Platform[os as keyof typeof Platform] || os;
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
  const os = platform();
  const architecture = arch() as NodeJS.Architecture;

  const filename = `gh_${version}_${getOS(os)}_${getArch(architecture)}`;
  const extension = os === 'win32' ? 'zip' : 'tar.gz';

  return {
    binaryDirectory: os === 'win32' ? 'bin' : join(filename, 'bin'),
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
  return join(directory, name + (platform() === 'win32' ? '.exe' : ''));
}
