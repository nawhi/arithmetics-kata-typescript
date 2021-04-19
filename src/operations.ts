import {BINARY_OPERATIONS, Operator} from "./tokens";

export function operate(a: number, b: number, operand: Operator): number {
  return BINARY_OPERATIONS[operand](a, b);
}

