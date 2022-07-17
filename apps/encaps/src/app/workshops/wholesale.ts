import { Product } from './product';
import { Stock } from './stock';

export class Wholesaler {
  constructor(private stock: Stock) {}

  public sellToShop(product: Product, amount: number) {
    if (this.stock.enoughProductsInStock(amount, product)) {
      this.stock.subtractFromStock(amount, product);
    } else {
      throw new Error('There is no enough products in stock');
    }
  }
}
