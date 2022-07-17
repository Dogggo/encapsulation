import { Customer } from "./customer";
import { Printer } from "./printer/printer.interface";
import { roundToTwo } from "./roundToTwo";
import { Product } from "./product";
import { Stock } from "./stock";
import { Wholesaler } from "./wholesale";

export class Shop {

    constructor(private stock: Stock, private bankMoney: number){
        Shop.assertMoneyIsNotNegative(bankMoney);
    };

    private static assertMoneyIsNotNegative(bankMoney: number): void {
        if(bankMoney < 0){
            throw new Error("Shop cannot have overdraft");
        }
    }

    public sellProduct(product: Product, amount: number, customer: Customer): void {

        if (this.stock.enoughProductsInStock(amount, product)) {
            product.sellToCustomer(customer, amount, this);
            this.stock.subtractFromStock(amount, product);
        }
        else {
            throw new Error('Not enough products in a stock');
        }
    }

    public putMoney(money: number) {
        this.bankMoney = roundToTwo(this.bankMoney + money);
    }

    public withdrawMoney(money: number) {
        this.bankMoney = this.bankMoney - money;
    }

    public haveEnoughProductInStock(product: Product, amount: number): boolean {
        return this.stock.enoughProductsInStock(amount, product) ? true : false;  
    }

    public resupplyStock(wholesaler: Wholesaler, product: Product, amount: number, margin: number = 2) {
        wholesaler.sellToShop(product, amount);
        this.withdrawMoney(product.calculatePrice(product, amount));
        product.addTaxes(margin);
        this.stock.addToStock(product, amount);
    }

    public moneyBalance(printer: Printer): void {
        printer.print(this.bankMoney + '$');
    }
}