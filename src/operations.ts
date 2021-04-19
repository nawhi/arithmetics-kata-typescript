import {badSyntax} from "./errors";
import {BINARY_OPERATIONS, isOperand, Operand} from "./tokens";

export function operate(a: number, b: number, operand: Operand): number {
  return isOperand(operand) ? BINARY_OPERATIONS[operand](a, b) : badSyntax();
}

