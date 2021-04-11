export const SYNTAX_ERROR = "syntax error";
export const DIVISION_BY_ZERO = "division by zero";

export class BadSyntax extends Error {
  constructor() {
    super(SYNTAX_ERROR);
  }
}

export class DivisionByZero extends Error {
  constructor() {
    super(DIVISION_BY_ZERO);
  }
}
