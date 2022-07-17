import { Printer } from "./printer.interface";

export class SpyPrinter implements Printer {
    data = '';
    print(data: string): void {
        this.data = data;
    }
}