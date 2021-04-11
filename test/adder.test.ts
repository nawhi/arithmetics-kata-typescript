import { expect } from "chai";
import { evaluate } from "../src/adder";

describe("adder", () => {
  describe("additions", () => {
    const cases = [
      ["( 0 + 0 )", 0],
      ["( 1 + 1 )", 2],
      ["( 3 + 8 )", 11],
      ["( 100 + 200 )", 300],
    ] as const;
    cases.forEach(([input, expected]) => {
      it(`evaluates ${input} = ${expected}`, () => {
        expect(evaluate(input)).to.eql(expected);
      });
    });
  });

  describe("errors", () => {
    it("throws ParseError when the input is invalid");
  });
});
