const spyReturns = returnValue => jest.fn(() => returnValue);

describe("mocked tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  // Factory
  const setup = async (mockOverrides) => {
    const mockedFunctions = {
      __esModule: true,
      default: spyReturns("mocked default export"),
      add: spyReturns(54),
      subtract: spyReturns(45),
      ...mockOverrides
    }
    jest.doMock('./sampleModule', () => mockedFunctions)
    return {
      mockedModule: await import('./sampleModule') // Async
    }
  }

  test('automocked implementation?', () => {
    setup().then(({ mockedModule }) => {
        expect(mockedModule.default._isMockFunction).toBeTruthy();
        expect(mockedModule.add._isMockFunction).toBeTruthy();
        expect(mockedModule.subtract._isMockFunction).toBeTruthy();
    });
  });

  test("testing mocking module - default", () => {
    const EXPECTED_VALUE = "override";
    setup({ default: spyReturns(EXPECTED_VALUE)}).then(({ mockedModule }) => {
        const result = mockedModule.default();
        expect(result).toEqual('override');
    });
  });

  test("testing mocking module - add", () => {
    setup().then(({ mockedModule }) => {
        const result = mockedModule.add(5, 4);
        expect(result).toEqual(54);
    });
  });

  test("testing mocking module - subtract", () => {
    setup().then(({ mockedModule }) => {
        const result = mockedModule.subtract(5, 4);
        expect(result).toEqual(45);
    });
  });
});