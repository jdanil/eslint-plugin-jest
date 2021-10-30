export type JestVersion =
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | number;

let cachedJestVersion: JestVersion | null = null;

export const detectJestVersion = (): JestVersion => {
  if (cachedJestVersion) {
    return cachedJestVersion;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const jestVersion = require('child_process').execSync('jest --version', { encoding: 'utf-8' }).trim();

    if (jestVersion) {
      const [majorVersion] = jestVersion.split('.');
      return cachedJestVersion = parseInt(majorVersion, 10);
    }
  } catch {}

  throw new Error(
    'Unable to detect Jest version - please ensure jest package is installed, or otherwise set version explicitly',
  );
};
