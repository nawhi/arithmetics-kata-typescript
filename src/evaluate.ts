import { badSyntax } from "./errors";
import { operate } from "./operations";

export function evaluate(input: string): number {
  const tokens = input.split(" ");
  return evaluateBinaryOperation(tokens);
}

function next(tokens: string[]): string {
  return tokens.shift() || badSyntax();
}

function isNumber(token: string): boolean {
  return /^\d+$/.test(token);
}

function evaluateBinaryOperation(
  tokens: string[],
  accumulator: number = 0
): number {
  const ltoken = next(tokens);
  const lvalue =
    ltoken === "(" ? evaluateBinaryOperation(tokens) : Number(ltoken);
  if (!tokens.length) return lvalue;
  const op = next(tokens);
  const rvalue = next(tokens);
  const _closingBracket = next(tokens);
  if (isNumber(rvalue)) {
    return operate(lvalue, Number(rvalue), op);
  } else {
    throw new Error("not implemented");
  }
}
