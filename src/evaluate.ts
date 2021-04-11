import { BadSyntax, DivisionByZero } from "./errors";

export function evaluate(input: string): number {
  const [a, operand, b] = tokenize(input);

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
  }
}

type Operand = "+" | "-" | "*" | "/";

function tokenize(input: string): [number, Operand, number] {
  const tokens = input.match(/\( (\d+) ([+\-*\/]) (\d+) \)/);
  if (!tokens) {
    throw new BadSyntax();
  }
  const [, rawA, operand, rawB] = tokens;
  return [Number(rawA), operand as Operand, Number(rawB)];
}
