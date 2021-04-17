import { expect } from "chai";
import { evaluate } from "../src/evaluate";
import {BAD_SYNTAX, DIVISION_BY_ZERO, END_OF_INPUT} from "../src/errors";

describe("adder", () => {
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

    ["( ( 1 + 2 ) + 3 )", 6],
    ["( ( ( 1 + 2 ) + 3 ) + 4 )", 10],
    ["( ( ( ( 1 + 2 ) + 3 ) + 4 ) + 5 )", 15],

    ["( 10 + ( 20 + 30 ) )", 60],
    ["( 10 + ( 20 + ( 30 + 40 ) ) )", 100]
  ] as const;
  cases.forEach(([input, expected]) => {
    it(`evaluates ${input} = ${expected}`, () => {
      expect(evaluate(input)).to.eql(expected);
    });
  });

  it("throws a syntax error when receiving invalid input", () => {
    expect(() => evaluate("( 1 % 3 )")).to.throw(BAD_SYNTAX);
  });

  it('throws a syntax error when a closing bracket was expected', () => {
    expect(() => evaluate("( ( 1 + 2 _ + 3 )")).to.throw(BAD_SYNTAX);
  });

  it("throws a division by zero error when asked to divide by zero", () => {
    expect(() => evaluate("( 9 / 0 )")).to.throw(DIVISION_BY_ZERO);
  });

  it('throws a syntax error when receiving input with unclosed bracket', () => {
    expect(() => evaluate("( 1 + 2")).to.throw(END_OF_INPUT);
  });
});
