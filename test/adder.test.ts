import { expect } from "chai";
import { evaluate } from "../src/adder";

describe("adder", () => {
  const cases = [
    ["1", "1"],
    ["f", "parse error: illegal character 'f'"],
  ] as const;

  cases.forEach(([input, expected]) => {
    it(`evaluates ${input} = ${expected}`, () => {
      expect(evaluate(input)).to.eql(expected);
    });
  });
});
