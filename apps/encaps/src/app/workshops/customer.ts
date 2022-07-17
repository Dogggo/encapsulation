import { Printer } from './printer/printer.interface';
import { Product } from './product';
import { Shop } from './shop';
import { Wallet } from './wallet';

export class Customer {
  constructor(
    private wallet: Wallet,
    private fullName: string,
    private products: Array<Product>
  ) {}

  public buyFromShop(
    price: number,
    product: Product,
    shop: Shop,
    amount: number
  ): void {
    if (!this.wallet.haveEnoughMoney(price)) {
      throw new Error('There is not enough money in a wallet');
    }

    if (!shop.haveEnoughProductInStock(product, amount)) {
      throw new Error('There is not enough product in a stock');
    }

    this.wallet.withdraw(price);

    for (let i = 0; i < amount; i++) this.products.push(product);
  }

  public balance(printer: Printer): void {
    this.wallet.balance(printer);
  }
}
