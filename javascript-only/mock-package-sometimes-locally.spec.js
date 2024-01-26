// This setup does not work!
// If the test dealing with the mock runs first, the import will includes it even for the other test.
import { jest } from "@jest/globals";

test.skip("mock package here but locally", async () => {
  // Arrange
  jest.unstable_mockModule("path", () => ({
    extname: jest.fn(),
  }));
  const { extname } = await import("path");
  const { play } = await import("./src/use-package.js");
  extname.mockReturnValue(".yop");

  // Act / Assert
  expect(play()).toBe(".yop");
  expect(extname).toHaveBeenCalledTimes(1);
});

test.skip("do not mock package here but locally", async () => {
  // Arrange
  const { play } = await import("./src/use-package.js");

  // Act / Assert
  expect(play()).toBe(".txt");
  expect(extname).toHaveBeenCalledTimes(1);
});
