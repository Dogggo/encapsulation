import { Product } from './product';
import { Stock } from './stock';
import { StockProduct } from './stock-product.interface';
import { Wholesaler } from './wholesale';

describe('wholesale', () => {
  const notEnoughtProductInStock = 'There is no enough products in stock';
  it('is not possible to sell products when there is not enough in stock', () => {
    //given
    const productName = 'red apple';
    const redApple = new Product(productName, 1);

    const stockProduct: StockProduct = {
      products: [redApple, redApple, redApple],
      key: productName,
    };
    const wholesalerStock = new Stock([stockProduct]);
    const wholesaler = new Wholesaler(wholesalerStock);

    //when, then
    expect(() =>
      wholesaler.sellToShop(redApple, stockProduct.products.length - 1)
    ).toThrow(notEnoughtProductInStock);
  });
});
