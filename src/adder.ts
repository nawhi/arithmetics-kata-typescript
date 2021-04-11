export function evaluate(input: string): number {
  const operands = input.match(/\( (\d+) \+ (\d+) \)/)
  if (!operands) {
    throw new Error("syntax error");
  }
  const [, a, b] = operands;
  return Number(a) + Number(b);
}
