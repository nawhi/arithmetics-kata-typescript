import {badSyntax, divisionByZero} from "./errors";

const OPERANDS = ["+", "-", "*", "/"];
export type Operand = typeof OPERANDS[number];

export function isOperand(token: string): token is Operand {
  return OPERANDS.includes(token);
}

export function operate(a: number, b: number, operand: Operand): number {
  return isOperand(operand) ? BINARY_OPERATIONS[operand](a, b) : badSyntax();
}

type BinaryOperation = (a: number, b: number) => number;

const BINARY_OPERATIONS: { [o in Operand]: BinaryOperation } = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b == 0 ? divisionByZero() : a / b),
};
