export function evaluate(input: string): number {
  const tokens = input.match(/\( (\d+) ([+-]) (\d+) \)/)
  if (!tokens) {
    throw new Error("syntax error");
  }
  const [, a, operand, b] = tokens;
  return operand == "+" ? Number(a) + Number(b) : Number(a) - Number(b);
}
