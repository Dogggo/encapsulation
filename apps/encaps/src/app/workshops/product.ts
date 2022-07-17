import { Customer } from './customer';
import { roundToTwo } from './roundToTwo';
import { Shop } from './shop';
import { StockProduct } from './stock-product.interface';

export class Product {
  constructor(private name: string, private price: number) {
    Product.assrtPriceCantBeZeroOrLess(price);
  }

  private static assrtPriceCantBeZeroOrLess(price: number): void {
    if (price <= 0) {
      throw new Error('Price cant be equal or lower than zero');
    }
  }

  public sellToCustomer(
    customer: Customer,
    amount: number = 1,
    shop: Shop
  ): void {
    customer.buyFromShop(this.price, this, shop, amount);
    console.log(roundToTwo(this.price));
    shop.putMoney(roundToTwo(this.price));
  }

  public addTaxes(margin: number) {
    this.price = roundToTwo(this.price + (this.price * margin) / 100);
  }

  public findProductFromStock(
    products: StockProduct[],
    product: Product
  ): StockProduct | undefined {
    let foundProduct;

    products.find((value) => {
      console.log(JSON.stringify(value.key), JSON.stringify(product.name));
      value.key === product.name
        ? (foundProduct = value)
        : (foundProduct = undefined);
    });
    return foundProduct;
  }

  public calculatePrice(product: Product, amount: number) {
    return product.price * amount;
  }

  public createStockOfProduct(): StockProduct {
    const stackProduct: StockProduct = {
      products: [],
      key: this.name,
    };
    return stackProduct;
  }
}
