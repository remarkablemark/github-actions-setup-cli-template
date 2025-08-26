import path from 'node:path';

import { addPath, getInput, setFailed } from '@actions/core';
import { exec } from '@actions/exec';
import {
  cacheFile,
  downloadTool,
  extractTar,
  extractZip,
  find,
} from '@actions/tool-cache';

import { getBinaryPath, getDownloadObject } from './utils';

const DEFAULT_NAME = 'gh';

export async function run() {
  try {
    // Get the version and name of the tool to be installed
    const cliVersion = getInput('cli-version');
    const cliName = getInput('cli-name') || DEFAULT_NAME;
    const toolName = cliName;

    // Find previously cached directory (if applicable)
    let binaryPath = find(toolName, cliVersion);
    const isCached = Boolean(binaryPath);

    /* istanbul ignore else */
    if (!isCached) {
      // Download the specific version of the tool (e.g., tarball/zipball)
      const download = getDownloadObject(cliVersion);
      const pathToTarball = await downloadTool(download.url);

      // Extract the tarball/zipball onto the host runner
      const extract = download.url.endsWith('.zip') ? extractZip : extractTar;
      const extractDirectory = await extract(pathToTarball);

      // Get the binary
      const binaryDirectory = path.join(
        extractDirectory,
        download.binaryDirectory,
      );
      binaryPath = getBinaryPath(binaryDirectory, cliName);

      // Rename the binary
      /* istanbul ignore else */
      if (cliName !== DEFAULT_NAME) {
        await exec('mv', [
          getBinaryPath(binaryDirectory, DEFAULT_NAME),
          binaryPath,
        ]);
      }
    }

    // Expose the tool by adding it to the PATH
    addPath(path.dirname(binaryPath));

    // Cache the tool
    /* istanbul ignore else */
    if (!isCached) {
      await cacheFile(binaryPath, cliName, toolName, cliVersion);
    }
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
