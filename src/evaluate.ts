import _ from "lodash";
import { badSyntax, endOfInput } from "./errors";
import { operate } from "./operations";

const OPEN_PAREN = "(";
const CLOSE_PAREN = ")";

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
    return this.tokens.shift() || endOfInput();
  }

  finished(): boolean {
    return this.tokens.length === 0;
  }
}

function readValue(tokens: Tokenizer) {
  const ltoken = tokens.next();
  return ltoken === OPEN_PAREN
    ? evaluateBinaryOperation(tokens)
    : Number(ltoken);
}

function evaluateBinaryOperation(tokens: Tokenizer): number {
  const lvalue = readValue(tokens);
  if (tokens.finished()) {
    return lvalue;
  }
  const op = tokens.next();
  const rvalue = readValue(tokens);
  const result = operate(lvalue, rvalue, op);
  syntaxRequires(tokens.next() == CLOSE_PAREN);
  return result;
}

function syntaxRequires(condition: boolean): void {
  if (!condition) {
    badSyntax();
  }
}
