import _ from "lodash";
import { badSyntax } from "./errors";
import { operate } from "./operations";

export function evaluate(input: string): number {
  const tokens = new Tokenizer(input);
  return evaluateBinaryOperation(tokens);
}

function isNumber(token: string): boolean {
  return /^\d+$/.test(token);
}

class Tokenizer {
  private tokens: string[];
  constructor(rawString: string) {
    this.tokens = rawString.split(" ");
  }

  next(): string;
  next(quantity: number): string[];
  next(quantity?: number): string | string[] {
    return quantity !== undefined
      ? _.times(quantity).map(() => this.getToken())
      : this.getToken();
  }

  private getToken(): string {
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
  const ltoken = tokens.next();
  const lvalue =
    ltoken === "(" ? evaluateBinaryOperation(tokens) : Number(ltoken);
  if (tokens.finished()) return lvalue;
  const [op, rvalue, _closingBracket] = tokens.next(3);
  if (isNumber(rvalue)) {
    return operate(lvalue, Number(rvalue), op);
  } else {
    throw new Error("not implemented");
  }
}
