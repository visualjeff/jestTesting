const spyReturns = returnValue => jest.fn(() => returnValue);

describe("mocked tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  // Factory
  const setup = async (mockOverrides) => {
    const mockedFunctions = {
      __esModule: true,
      servicePayload: spyReturns({
        bath: true,
        bedrooms: 4,
        kitchen: {
          amenities: ['oven', 'stove', 'washer'],
          area: 20,
          wallColor: 'white',
          'nice.oven': true,
        },
        livingroom: {
          amenities: [
            {
              couch: [
                ['large', {dimensions: [20, 20]}],
                ['small', {dimensions: [10, 10]}],
              ],
            },
          ],
        },
        'ceiling.height': 'tall',
      }),
      ...mockOverrides
    }
    jest.doMock('./sampleModule', () => mockedFunctions)
    return {
      mockedModule: await import('./sampleModule') // Async
    }
  }

  it("testing mocking module - servicePayload", () => {
    setup().then(({ mockedModule }) => {
      const houseForSale = mockedModule.servicePayload();
      // Example Referencing
      expect(houseForSale).toHaveProperty('bath');
      expect(houseForSale).toHaveProperty('bedrooms', 4);

      expect(houseForSale).not.toHaveProperty('pool');

      // Deep referencing using dot notation
      expect(houseForSale).toHaveProperty('kitchen.area', 20);
      expect(houseForSale).toHaveProperty('kitchen.amenities', [
        'oven',
        'stove',
        'washer',
      ]);

      expect(houseForSale).not.toHaveProperty('kitchen.open');

      // Deep referencing using an array containing the keyPath
      expect(houseForSale).toHaveProperty(['kitchen', 'area'], 20);
      expect(houseForSale).toHaveProperty(
        ['kitchen', 'amenities'],
        ['oven', 'stove', 'washer'],
      );
      expect(houseForSale).toHaveProperty(['kitchen', 'amenities', 0], 'oven');
      expect(houseForSale).toHaveProperty(
        'livingroom.amenities[0].couch[0][1].dimensions[0]',
        20,
      );
      expect(houseForSale).toHaveProperty(['kitchen', 'nice.oven']);
      expect(houseForSale).not.toHaveProperty(['kitchen', 'open']);

      // Referencing keys with dot in the key itself
      expect(houseForSale).toHaveProperty(['ceiling.height'], 'tall');
    });
  });
});