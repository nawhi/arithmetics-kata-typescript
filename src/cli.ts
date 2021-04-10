import { evaluate } from "./adder";
import readline from "readline";

export async function runCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    try {
      const input = await readLine(rl);
      writeLine(rl, evaluate(input));
    } catch (e) {
      return;
    }
  }
}

function readLine(rl: readline.Interface): Promise<string> {
  return new Promise((resolve, reject) => {
    rl.prompt();
    rl.on("close", () => reject("Finished"));
    rl.on("line", (input) => resolve(input));
  });
}

function writeLine(rl: readline.Interface, line: string): void {
  rl.write(line + "\n");
}
