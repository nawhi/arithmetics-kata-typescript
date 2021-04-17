import _ from "lodash";
import {badSyntax, endOfInput} from "./errors";
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
    return this.tokens.shift() || endOfInput();
  }

  finished(): boolean {
    return this.tokens.length === 0;
  }
}

function evaluateBinaryOperation(tokens: Tokenizer): number {
  const ltoken = tokens.next();
  const lvalue =
    ltoken === "(" ? evaluateBinaryOperation(tokens) : Number(ltoken);
  if (tokens.finished()) return lvalue;
  const [op, rtoken] = tokens.next(2);
  if (isNumber(rtoken)) {
    const rvalue = Number(rtoken);
    const result = operate(lvalue, rvalue, op);
    syntaxRequires(tokens.next() == ")");
    return result;
  } else {
    const rvalue = evaluateBinaryOperation(tokens);
    const result = operate(lvalue, rvalue, op);
    syntaxRequires(tokens.next() == ")");
    return result;
  }
}

function syntaxRequires(condition: boolean): void {
  if (!condition) {
    badSyntax();
  }
}
