import {badSyntax, endOfInput} from "./errors";
import {operate} from "./operations";
import {CLOSE_PAREN, OPEN_PAREN, parseNumber, parseOperator} from "./tokens";

export function evaluate(input: string): number {
  const tokens = new TokenConsumer(input);
  return readBinaryOp(tokens);
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

function readBinaryOp(tokens: TokenConsumer): number {
  const lvalue = readValue(tokens);
  if (tokens.finished()) {
    return lvalue;
  }
  const operator = parseOperator(tokens.next());
  const rvalue = readValue(tokens);
  const result = operate(lvalue, rvalue, operator);
  syntaxRequires(tokens.next() == CLOSE_PAREN);
  return result;
}

function syntaxRequires(condition: boolean): void {
  if (!condition) {
    badSyntax();
  }
}
