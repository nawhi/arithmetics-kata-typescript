import { badSyntax } from "./errors";
import { operate } from "./operations";

export function evaluate(input: string): number {
  const tokens = input.split(" ");
  return readBinOp(tokens);
}

function next(tokens: string[]): string {
  return tokens.shift() || badSyntax();
}

function isNumber(token: string): boolean {
  return /^\d+$/.test(token);
}

function readBinOp(tokens: string[]): number {
  const lvalue = next(tokens);
  if (lvalue === "(") {
    return readBinOp(tokens);
  } else {
    const op = next(tokens);
    const rvalue = next(tokens);
    if (isNumber(rvalue)) {
      return operate(Number(lvalue), Number(rvalue), op);
    } else {
      throw new Error("not implemented");
    }
  }
}
