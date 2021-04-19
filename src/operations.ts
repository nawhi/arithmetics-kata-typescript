import {Operator} from "./tokens";
import {divisionByZero} from "./errors";

type BinaryOperation = (a: number, b: number) => number;
export const BINARY_OPERATIONS: { [o in Operator]: BinaryOperation } = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b == 0 ? divisionByZero() : a / b),
};

export function operate(a: number, b: number, operand: Operator): number {
  return BINARY_OPERATIONS[operand](a, b);
}

