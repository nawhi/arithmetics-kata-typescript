import { badSyntax } from "./errors";
import { operate } from "./operations";

export function evaluate(input: string): number {
  const tokens = new Tokenizer(input);
  return evaluateBinaryOperation(tokens);
}

function next(tokens: Tokenizer): string {
  return tokens.next() || badSyntax();
}

function isNumber(token: string): boolean {
  return /^\d+$/.test(token);
}

class Tokenizer {
  private tokens: string[];
  constructor(rawString: string) {
    this.tokens = rawString.split(" ");
  }

  next(): string {
    return this.tokens.shift() || badSyntax();
  }

  finished(): boolean {
    return this.tokens.length === 0;
  }
}

function evaluateBinaryOperation(
  tokens: Tokenizer,
  accumulator: number = 0
): number {
  const ltoken = next(tokens);
  const lvalue =
    ltoken === "(" ? evaluateBinaryOperation(tokens) : Number(ltoken);
  if (tokens.finished()) return lvalue;
  const op = next(tokens);
  const rvalue = next(tokens);
  const _closingBracket = next(tokens);
  if (isNumber(rvalue)) {
    return operate(lvalue, Number(rvalue), op);
  } else {
    throw new Error("not implemented");
  }
}
