import { expect } from "chai";
import { evaluate } from "../src/adder";

describe("adder", () => {
  describe("additions", () => {
    const cases = [
      ["( 0 + 0 )", 0],
      ["( 1 + 1 )", 2],
      ["( 3 + 8 )", 11],
      ["( 100 + 200 )", 300],

      ["( 5 - 3 )", 2],
      ["( 500 - 930 )", -430],

      ["( 8 * 4 )", 32],
      ["( 9 * 0 )", 0],
    ] as const;
    cases.forEach(([input, expected]) => {
      it(`evaluates ${input} = ${expected}`, () => {
        expect(evaluate(input)).to.eql(expected);
      });
    });
  });

  describe("errors", () => {
    const cases = ["( 6 ? 9 )"];
    cases.forEach((input) => {
      it(`throws a syntax error when receiving ${input}`, () => {
        expect(() => evaluate(input)).to.throw(/syntax error/);
      });
    });
  });
});
