import {BadSyntax, DivisionByZero} from "./errors";

export function evaluate(input: string): number {
  const tokens = input.match(/\( (\d+) ([+\-\*\/]) (\d+) \)/);
  if (!tokens) {
    throw new BadSyntax();
  }
  const [, rawA, operand, rawB] = tokens;
  const [a, b] = [Number(rawA), Number(rawB)];
  switch (operand) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b == 0) {
        throw new DivisionByZero();
      }
      return a / b;
    default:
      throw new BadSyntax();
  }
}
