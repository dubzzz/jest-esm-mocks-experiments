import { jest } from "@jest/globals";

jest.unstable_mockModule("path", () => ({
  extname: jest.fn(),
}));
const PathMock = await import("path");
const { play } = await import("./src/use-package");

beforeEach(() => {
  jest.resetAllMocks();
});

test("mock package", () => {
  // Arrange
  const { extname } = PathMock as jest.Mocked<typeof PathMock>;
  extname.mockReturnValue(".yop");

  // Act / Assert
  expect(play()).toBe(".yop");
  expect(extname).toHaveBeenCalledTimes(1);
});
