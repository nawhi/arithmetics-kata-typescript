export const OPEN_PAREN = "(";
export const CLOSE_PAREN = ")";

const OPERATORS = ["+", "-", "*", "/"];
export type Operator = typeof OPERATORS[number];

export const isOperator = (token: string): token is Operator =>
  OPERATORS.includes(token);

export function parseOperator(token: string): Operator {
  if (!isOperator(token)) {
    throw new Error(
      `invalid token: expected one of +, -, *, / but got '${token}'`
    );
  }
  return token;
}

const isNumber = (token: string): boolean => /^\d+$/.test(token);

export function parseNumber(token: string) {
  if (!isNumber(token)) {
    throw new Error(`invalid token: expected a number but got '${token}'`);
  }
  return Number(token);
}
