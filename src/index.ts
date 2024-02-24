import { addPath, getInput, setFailed } from '@actions/core';
import { downloadTool, extractTar, extractZip } from '@actions/tool-cache';

import { getDownloadObject } from './utils';

export async function run() {
  try {
    // Get the version of the tool to be installed
    const version = getInput('cli-version');

    // Download the specific version of the tool (e.g., tarball/zipball)
    const download = getDownloadObject(version);
    const pathToTarball = await downloadTool(download.url);

    // Extract the tarball/zipball onto the host runner
    const extract = download.url.endsWith('.zip') ? extractZip : extractTar;
    const binaryDirectory = await extract(pathToTarball);

    // Expose the tool by adding it to the PATH
    addPath(binaryDirectory);
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
