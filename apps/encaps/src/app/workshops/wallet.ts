import { Printer } from "./printer/printer.interface";

export class Wallet {
    
    constructor(private money: number) {
        Wallet.assertMoneyIsNotNegative(money);
    }

    private static assertMoneyIsNotNegative(money: number): void {
        if(money < 0){
            throw new Error("You have not enough money is your wallet");
        }
    }
    
    public withdraw(money: number): number {
        const moneyAfterWithdrawal = this.money - money;
        Wallet.assertMoneyIsNotNegative(moneyAfterWithdrawal);

        this.money = moneyAfterWithdrawal;
        return money;
    }
    
    public haveEnoughMoney(value: number): boolean {
        console.log(value, this.money)
       return value <= this.money ? true : false;
    }

    public putMoney(amount: number): void {
        this.money = this.money + amount;
    }

    public balance(printer: Printer): void {
        printer.print(this.money + '$');
    }
}