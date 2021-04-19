import { expect } from "chai";
import { evaluate } from "../src/evaluate";
import { BAD_SYNTAX, DIVISION_BY_ZERO, END_OF_INPUT } from "../src/errors";

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
    ["( 10 + ( 20 + ( 30 + 40 ) ) )", 100],

    ["( 5 + ( ( 7 * 14 ) + ( 8 / 4 ) ) )", 105],
  ] as const;
  cases.forEach(([input, expected]) => {
    it(`evaluates ${input} = ${expected}`, () => {
      expect(evaluate(input)).to.eql(expected);
    });
  });

  const errorCases = [
    ["( 1 % 3 )", "invalid token: expected one of +, -, *, / but got '%'"],
    ["( foo + bar )", "invalid token: expected a number but got 'foo'"],
    ["( ( 1 + 2 _ + 3 )", BAD_SYNTAX],
    ["( 9 / 0 )", DIVISION_BY_ZERO],
    ["( 1 + 2", END_OF_INPUT],
  ] as const;

  errorCases.forEach(([input, expectedError]) => {
    it(`fails to evaluate ${input} with error "${expectedError}"`, () => {
      expect(() => evaluate(input)).to.throw(expectedError);
    })
  })
});
