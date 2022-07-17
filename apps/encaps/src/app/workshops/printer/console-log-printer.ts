import { Printer } from "./printer.interface";

export class ConsoleLogPrinter implements Printer {
    print(data: string): void {
        console.log(data);
    }
}