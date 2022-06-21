import sampleModule from "./sampleModule";

// Mock only one method in a module
jest.mock("./sampleModule", () => {
  const actualSampleModule = jest.requireActual("./sampleModule");
  return {
    ...actualSampleModule,
    subtract: jest.fn(() => {
      return 45;
    })
  }
  });

describe("mocked", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("testing mocking module - default", () => {
    const result = sampleModule.default();
    expect(result).toEqual('default export');
  });

  test("testing mocking module - add", () => {
    const result = sampleModule.add(5, 4);
    expect(result).toEqual(9);
  });

  test("testing mocking module - subtract", () => {
    const result = sampleModule.subtract(5, 4);
    expect(result).toEqual(45);
  });
});
