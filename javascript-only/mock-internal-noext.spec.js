import { jest } from "@jest/globals";

jest.unstable_mockModule("./src/internal", () => ({
  compute: jest.fn(),
}));
const InternalMock = await import("./src/internal");
const { play } = await import("./src/use-internal");

beforeEach(() => {
  jest.resetAllMocks();
});

test("mock internal without any extension on unstable_mockModule", () => {
  // Arrange
  const { compute } = InternalMock;
  compute.mockReturnValue("from test");

  // Act / Assert
  expect(play()).toBe("from test");
  expect(compute).toHaveBeenCalledTimes(1);
});

// What happens on this file?

// Actually Jest implicitely relies on babel-jest.
// If you modify it, you can track the transpiled version easily:
// - Open "node_modules/babel-jest/build/index.js"
// - Look for "async processAsync(sourceText, sourcePath, transformOptions)"
// - Add "if (sourcePath.includes('mock-internal-noext.spec')) { console.log(code) }" right after "const {code, map} = transformResult"
// - Run your tests again

// The file is preserved as is!
// But "await import('./src/use-internal')" is not valid from Node point-of-view.
// Even with "node --experimental-vm-modules file-name.js"

// What happens is jest-resolve!
// It defines the following mappings:
// - ./internal -> /workspaces/jest-esm-mocks-experiments/javascript-only/src/internal.js
// - ./src/use-internal -> /workspaces/jest-esm-mocks-experiments/javascript-only/src/use-internal.js

// To confirm that you can:
// - Open "node_modules/jest-resolve/build/defaultResolver.js"
// - Look for "const defaultResolver = (path, options)"
// - Add "console.log(path + " -> " + result)" right after "const result = (0, _resolve().sync)(pathToResolve, resolveOptions);"
// - Run your tests again
