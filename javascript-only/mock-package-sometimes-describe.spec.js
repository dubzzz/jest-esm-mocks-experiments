import { jest } from "@jest/globals";

jest.unstable_mockModule("path", () => ({
  extname: jest.fn(),
}));
const PathMock = await import("path");
const { play } = await import("./src/use-package.js");

describe("mocked", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("mock package here", () => {
    // Arrange
    const { extname } = PathMock;
    extname.mockReturnValue(".yop");

    // Act / Assert
    expect(play()).toBe(".yop");
    expect(extname).toHaveBeenCalledTimes(1);
  });
});

describe("barely unmocked", () => {
  beforeEach(() => {
    jest.resetAllMocks(); // needed if we want to run things such as toHaveBeenCalledTimes(1)
    const { extname } = PathMock;
    extname.mockImplementation(jest.requireActual("path").extname);
  });

  it("do not mock package here", () => {
    // Arrange
    const { extname } = PathMock;

    // Act / Assert
    expect(play()).toBe(".txt");
    expect(extname).toHaveBeenCalledTimes(1);
  });
});
