export const BAD_SYNTAX = "syntax error";
export const DIVISION_BY_ZERO = "division by zero";

export class BadSyntax extends Error {
  constructor() {
    super(BAD_SYNTAX);
  }
}

export class DivisionByZero extends Error {
  constructor() {
    super(DIVISION_BY_ZERO);
  }
}
