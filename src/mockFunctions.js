import { add } from "./sampleModule";

describe("mocked functions", () => {
    beforeEach(() => {
    });

    afterEach(() => {
    });

    it("test mock function", () => {
      add = jest.fn(() => {
        return 99;
      });

      const result = add(5, 4);
      expect(result).toBe(99);
    });
});