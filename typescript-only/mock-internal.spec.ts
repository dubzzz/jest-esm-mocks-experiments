import { jest } from "@jest/globals";

jest.unstable_mockModule("./src/internal.js", () => ({
  compute: jest.fn(),
}));
const InternalMock = await import("./src/internal.js");
const { play } = await import("./src/use-internal.js");

beforeEach(() => {
  jest.resetAllMocks();
});

test("mock internal", () => {
  // Arrange
  const { compute } = InternalMock as jest.Mocked<typeof InternalMock>;
  compute.mockReturnValue("from test");

  // Act / Assert
  expect(play()).toBe("from test");
  expect(compute).toHaveBeenCalledTimes(1);
});
