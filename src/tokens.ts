import {divisionByZero} from "./errors";

const OPERANDS = ["+", "-", "*", "/"];
export type Operand = typeof OPERANDS[number];

export function isOperand(token: string): token is Operand {
  return OPERANDS.includes(token);
}

type BinaryOperation = (a: number, b: number) => number;
export const BINARY_OPERATIONS: { [o in Operand]: BinaryOperation } = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b == 0 ? divisionByZero() : a / b),
};
export const OPEN_PAREN = "(";
export const CLOSE_PAREN = ")";
