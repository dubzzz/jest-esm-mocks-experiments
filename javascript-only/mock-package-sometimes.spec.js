import { jest } from "@jest/globals";

jest.unstable_mockModule("path", () => ({
  extname: jest.fn(),
}));
const PathMock = await import("path");
const { play } = await import("./src/use-package.js");

beforeEach(() => {
  jest.resetAllMocks();
});

test("mock package here", () => {
  // Arrange
  const { extname } = PathMock;
  extname.mockReturnValue(".yop");

  // Act / Assert
  expect(play()).toBe(".yop");
  expect(extname).toHaveBeenCalledTimes(1);
});

test("do not mock package here", () => {
  // Arrange
  const { extname } = PathMock;
  extname.mockImplementation(jest.requireActual("path").extname);

  // Act / Assert
  expect(play()).toBe(".txt");
  expect(extname).toHaveBeenCalledTimes(1);
});
