import index, { add, subtract } from "./sampleModule";

// see https://dev.to/slashgear_/discover-jest-hidden-feature-automock-2c9f
jest.enableAutomock();
index.mockImplementation(jest.fn(() => "mocked default export"))
add.mockImplementation(jest.fn(() => {
    return 54;
}));
subtract.mockImplementation(jest.fn(() => {
    return 45;
}));

  describe("mocked", () => {
    it('automocked implementation?', () => {
        // now we have the mocked implementation,
        expect(index._isMockFunction).toBeTruthy();
        expect(add._isMockFunction).toBeTruthy();
        expect(subtract._isMockFunction).toBeTruthy();
      });

    it("testing mocking module - default", () => {
      const result = index();
      expect(result).toEqual('mocked default export');
    });
  
    it("testing mocking module - add", () => {
      const result = add(5, 4);
      expect(result).toEqual(54);
    });
  
    it("testing mocking module - subtract", () => {
      const result = subtract(5, 4);
      expect(result).toEqual(45);
    });
  });
  
