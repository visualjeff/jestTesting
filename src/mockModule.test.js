import index, { add, subtract } from "./sampleModule";

// Mock module
jest.mock("./sampleModule", () => {
    return {
      __esModule: true,
      default: jest.fn(() => "mocked default export"),
      add: jest.fn(() => {
        return 54;
      }),
      subtract: jest.fn(() => {
        return 45;
      })
    };
  });

describe("mocked", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("testing mocking module - default", () => {
    const result = index();
    expect(result).toEqual('mocked default export');
  });

  test("testing mocking module - add", () => {
    const result = add(5, 4);
    expect(result).toEqual(54);
  });

  test("testing mocking module - subtract", () => {
    const result = subtract(5, 4);
    expect(result).toEqual(45);
  });
});
