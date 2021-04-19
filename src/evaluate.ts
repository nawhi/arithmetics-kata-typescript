import {badSyntax, endOfInput} from "./errors";
import {operate} from "./operations";
import {CLOSE_PAREN, OPEN_PAREN} from "./tokens";

export function evaluate(input: string): number {
  const tokens = new TokenConsumer(input);
  return readBinaryOp(tokens);
}

function isNumber(token: string): boolean {
  return /^\d+$/.test(token);
}

// TODO: replace the state in this object with recursion
class TokenConsumer {
  private tokens: string[];
  constructor(rawString: string) {
    this.tokens = rawString.split(" ");
  }

  next(): string {
    return this.tokens.shift() || endOfInput();
  }

  finished(): boolean {
    return this.tokens.length === 0;
  }
}

function readValue(tokens: TokenConsumer) {
  const ltoken = tokens.next();
  return ltoken === OPEN_PAREN ? readBinaryOp(tokens) : parseNumber(ltoken);
}

function parseNumber(token: string) {
  if (!isNumber(token)) {
    throw new Error(`invalid token: expected a number, got "${token}"`)
  }
  return Number(token);
}

function readBinaryOp(tokens: TokenConsumer): number {
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
