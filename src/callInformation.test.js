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
      add: spyReturns(45),
      ...mockOverrides
    }
    jest.doMock('./sampleModule', () => mockedFunctions)
    return {
      mockedModule: await import('./sampleModule') // Async
    }
  }

  test("testing mocking module - default", () => {
    const EXPECTED_VALUE = "override";
    setup({ default: spyReturns(EXPECTED_VALUE)}).then(({ mockedModule }) => {
        mockedModule.default();
        mockedModule.default();
        const result = mockedModule.default();
        expect(result).toEqual('override');

        // Two ways to get at the number of calls
        expect(mockedModule.default.mock.calls.length).toEqual(3);
        expect(mockedModule.default).toHaveBeenCalledTimes(3);
    });
  });

  test("testing mocking module - add", () => {
    setup().then(({ mockedModule }) => {
        const result = mockedModule.add(5, 4);
        expect(result).toEqual(45);
        expect(mockedModule.add).toHaveBeenCalledTimes(1);
        expect(mockedModule.add).toHaveBeenCalledWith(5, 4);
    });
  });
});