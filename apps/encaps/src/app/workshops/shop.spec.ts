import { Customer } from './customer';
import { SpyPrinter } from './printer/printer.spec';
import { Product } from './product';
import { Shop } from './shop';
import { Stock } from './stock';
import { Wallet } from './wallet';
import { Wholesaler } from './wholesale';

describe('shop', () => {
  const walmartSpy = new SpyPrinter();
  const stockSpy = new SpyPrinter();
  const walletCustomerSpy = new SpyPrinter();
  const notEnoughProductInStockError = 'Not enough products in a stock';
  it('should be possible to buy product', () => {
    //given
    const redApple = new Product('red apple', 1);
    const customerWallet = new Wallet(1);
    const customer = new Customer(customerWallet, 'Jan Kowalski', []);
    const shopStock = new Stock([{ key: 'red apple', products: [redApple] }]);
    const walmart = new Shop(shopStock, 0);

    //when
    walmart.sellProduct(redApple, 1, customer);
    walmart.moneyBalance(walmartSpy);
    shopStock.balance(stockSpy, redApple);

    //then
    expect(walmartSpy.data).toStrictEqual('1$');
    expect(stockSpy.data).toStrictEqual('0');
  });

  it('should not be possible to buy product', () => {
    //given
    const redApple = new Product('red apple', 1);
    const customerWallet = new Wallet(1);
    const customer = new Customer(customerWallet, 'Jan Kowalski', []);
    const shopStock = new Stock([{ key: 'red apple', products: [redApple] }]);
    const walmart = new Shop(shopStock, 0);

    //when, then
    expect(() => {
      walmart.sellProduct(redApple, 2, customer);
    }).toThrow(notEnoughProductInStockError);
  });

  it('should resupply apples and make shops bank account overdrafted', () => {
    //given
    const redApple = new Product('red apple', 1);
    const apples = [
      redApple,
      redApple,
      redApple,
      redApple,
      redApple,
      redApple,
      redApple,
      redApple,
      redApple,
      redApple,
    ];
    const shopStock = new Stock([]);
    const wholesaleStock = new Stock([{ key: 'red apple', products: apples }]);
    const walmart = new Shop(shopStock, 0);
    const wholesale = new Wholesaler(wholesaleStock);

    //when
    walmart.resupplyStock(wholesale, redApple, 10);
    walmart.moneyBalance(walmartSpy);
    shopStock.balance(stockSpy, redApple);

    //then
    expect(walmartSpy.data).toStrictEqual('-10$');
    expect(stockSpy.data).toStrictEqual('10');
  });

  it('shop should earn more by given margin after product resupply', () => {
    //given
    const productName = 'samsung galaxy';
    const phone = new Product(productName, 100);
    const phones = [phone, phone, phone];
    const shopStock = new Stock([]);
    const wholesaleStock = new Stock([{ key: productName, products: phones }]);
    const walmart = new Shop(shopStock, 400);
    const wholesale = new Wholesaler(wholesaleStock);
    const customerWallet = new Wallet(110);
    const customer = new Customer(customerWallet, 'Jan Kowalski', []);

    //when
    walmart.resupplyStock(wholesale, phone, 3, 5);
    walmart.sellProduct(phone, 1, customer);
    customerWallet.balance(walletCustomerSpy);

    //then
    expect(walletCustomerSpy.data).toStrictEqual('5$');
  });

  it('should have 0.02$ after resuppling product and then selling it to customer', () => {
    //given
    const productName = 'red apple';
    const apple = new Product(productName, 1);
    const apples = [apple, apple, apple];

    const customerWallet = new Wallet(2);
    const customer = new Customer(customerWallet, 'Jan Kowalski', []);

    const shopStock = new Stock([]);
    const walmart = new Shop(shopStock, 0);

    const wholesaleStock = new Stock([{ key: productName, products: apples }]);
    const wholesale = new Wholesaler(wholesaleStock);

    //when
    walmart.resupplyStock(wholesale, apple, 1);
    walmart.sellProduct(apple, 1, customer);
    walmart.moneyBalance(walmartSpy);

    //then
    expect(walmartSpy.data).toStrictEqual('0.02$');
  });
});
