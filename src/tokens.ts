import {divisionByZero} from "./errors";

const OPERATORS = ["+", "-", "*", "/"];
export type Operator = typeof OPERATORS[number];

export function isOperator(token: string): token is Operator {
  return OPERATORS.includes(token);
}

type BinaryOperation = (a: number, b: number) => number;
export const BINARY_OPERATIONS: { [o in Operator]: BinaryOperation } = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b == 0 ? divisionByZero() : a / b),
};
export const OPEN_PAREN = "(";
export const CLOSE_PAREN = ")";

function isNumber(token: string): boolean {
  return /^\d+$/.test(token);
}

export function parseNumber(token: string) {
  if (!isNumber(token)) {
    throw new Error(`invalid token: expected a number but got '${token}'`);
  }
  return Number(token);
}

export function parseOperator(token: string): Operator {
  if (!isOperator(token)) {
    throw new Error(
      `invalid token: expected one of +, -, *, / but got '${token}'`
    );
  }
  return token;
}
