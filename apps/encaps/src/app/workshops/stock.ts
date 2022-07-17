import { Printer } from './printer/printer.interface';
import { Product } from './product';
import { StockProduct } from './stock-product.interface';

export class Stock {
  constructor(private products: StockProduct[]) {}

  public enoughProductsInStock(amount: number, product: Product): boolean {
    const foundStockOfProduct = product.findProductFromStock(
      this.products,
      product
    );

    if (foundStockOfProduct === undefined) {
      return false;
    } else {
      return foundStockOfProduct!.products.length >= amount ? true : false;
    }
  }

  public subtractFromStock(amount: number, product: Product): void {
    const foundProduct = product.findProductFromStock(this.products, product);

    if (foundProduct) {
      const indexOfProduct = this.products.indexOf(foundProduct!);

      for (let i = 0; i < amount; i++)
        this.products[indexOfProduct].products.pop();
    }
  }

  public addToStock(product: Product, amount: number): void {
    let foundStockOfProduct = product.findProductFromStock(
      this.products,
      product
    );

    if (!foundStockOfProduct) {
      foundStockOfProduct = product.createStockOfProduct();
      this.products.push(foundStockOfProduct);
    }

    const indexOfProduct = this.products.indexOf(foundStockOfProduct!);

    for (let i = 0; i < amount; i++)
      this.products[indexOfProduct].products.push(product);
  }

  public balance(printer: Printer, product: Product): void {
    const foundProduct = product.findProductFromStock(this.products, product);

    if (foundProduct) {
      printer.print(JSON.stringify(foundProduct.products.length));
    }
  }
}
