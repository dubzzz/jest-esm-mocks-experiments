import { jest } from "@jest/globals";

jest.unstable_mockModule("./src/internal", () => ({
  compute: jest.fn(),
}));
const InternalMock = await import("./src/internal");
const { play } = await import("./src/use-internal");

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
