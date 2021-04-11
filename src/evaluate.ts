import {BadSyntax} from "./errors";
import {Operand, operate} from "./operations";

export function evaluate(input: string): number {
  const [a, operand, b] = tokenize(input);
  return operate(a, b, operand);
}

function tokenize(input: string): [number, Operand, number] {
  const tokens = input.match(/\( (\d+) ([+\-*\/]) (\d+) \)/);
  if (!tokens) {
    throw new BadSyntax();
  }
  const [, rawA, operand, rawB] = tokens;
  return [Number(rawA), operand as Operand, Number(rawB)];
}
