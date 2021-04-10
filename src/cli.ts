import { evaluate } from "./adder";
import readline from "readline";

export async function runCLI() {
  const console = new Console();
  while (true) {
    try {
      const input = await console.readLine();
      console.writeLine(evaluate(input).toString());
    } catch (e) {
      return;
    }
  }
}

class Quit extends Error {}

class Console {
  private interface: readline.Interface;

  constructor() {
    this.interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  readLine(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.interface.prompt();
      this.interface.on("close", () => reject(new Quit()));
      this.interface.on("line", (input) => resolve(input));
    });
  }

  writeLine(output: string) {
    this.interface.write(output + "\n");
  }

  close(): void {
    this.interface.close();
  }
}
