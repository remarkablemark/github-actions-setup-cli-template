import * as core from '@actions/core';

import { run } from '.';

jest.mock('@actions/core');

const mockedCore = jest.mocked(core);

beforeEach(() => {
  jest.resetAllMocks();
});

it('runs action successfully', async () => {
  const version = '1.2.3';
  mockedCore.getInput.mockReturnValueOnce(version);
  await run();
  expect(mockedCore.debug).toBeCalledWith(`version: ${version}`);
  expect(mockedCore.setOutput).toBeCalledWith('version', version);
});

it('runs action with error', async () => {
  const message = 'error';
  mockedCore.getInput.mockImplementationOnce(() => {
    throw new Error(message);
  });
  await run();
  expect(mockedCore.setFailed).toBeCalledWith(message);
});
