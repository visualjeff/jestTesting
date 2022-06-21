import { matchers } from 'jest-json-schema';
expect.extend(matchers);

describe("mocked functions", () => {
    const testFunction = jest.fn(() => {
      return {
        hello: "world"
      };
    });

    beforeEach(() => {
    });

    test("test mock function", () => {
      // See https://www.npmjs.com/package/jest-json-schema for API
      const schema = {
        properties: {
          hello: { type: 'string' },
        },
        required: ['hello'],
      };
      
      const result = testFunction();
      expect(result).toMatchSchema(schema);
    });
});