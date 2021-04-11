import { evaluate } from "./evaluate";
import readline from "readline";

export async function runCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    try {
      const input = await readLine(rl);
      try {
        writeLine(rl, evaluate(input).toString());
      } catch (e) {
        writeLine(rl, `Error: ${e.message}`);
      }
    } catch (e) {
      return;
    } finally {
      rl.close();
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
