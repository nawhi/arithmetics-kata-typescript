import {divisionByZero} from "./errors";

const OPERANDS = ["+", "-", "*", "/"];
export type Operator = typeof OPERANDS[number];

export function isOperator(token: string): token is Operator {
  return OPERANDS.includes(token);
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
