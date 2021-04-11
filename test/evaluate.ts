import { expect } from "chai";
import {evaluate} from "../src/evaluate";
import {BadSyntax, DivisionByZero} from "../src/errors";

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


      ["( 10 / 5 )", 2],
      ["( 5 / 2 )", 2.5],
    ] as const;
    cases.forEach(([input, expected]) => {
      it(`evaluates ${input} = ${expected}`, () => {
        expect(evaluate(input)).to.eql(expected);
      });
    });
  });

  describe("errors", () => {
    it('throws a syntax error when receiving invalid input', () => {
      expect(() => evaluate("( 1 % 3 )")).to.throw(BadSyntax);
    });

    it('throws a division by zero error when asked to divide by zero', () => {
      expect(() => evaluate("( 9 / 0 )")).to.throw(DivisionByZero)
    });
  });
});