export const BAD_SYNTAX = "syntax error";
export const DIVISION_BY_ZERO = "division by zero";
export const END_OF_INPUT = "unexpected end of input";

export function endOfInput(): never {
  throw new Error(END_OF_INPUT);
}

export function badSyntax(): never {
  throw new Error(BAD_SYNTAX);
}


export function divisionByZero(): never {
  throw new Error(DIVISION_BY_ZERO);
}
