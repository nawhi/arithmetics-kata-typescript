import { divisionByZero } from "./errors";

export type Operand = "+" | "-" | "*" | "/";

export function operate(a: number, b: number, operand: Operand): number {
  return BINARY_OPERATIONS[operand](a, b);
}

type BinaryOperation = (a: number, b: number) => number;

const BINARY_OPERATIONS: { [o in Operand]: BinaryOperation } = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b == 0 ? divisionByZero() : a / b),
};
