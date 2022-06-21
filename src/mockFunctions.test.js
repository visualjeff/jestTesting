describe("mocked functions", () => {
  const add = jest.fn(() => {
    return 99;
  });
  
  beforeEach(() => {
  });

  test("test mock function", () => {
    const result = add(5, 4);
    expect(result).toBe(99);
  });
});