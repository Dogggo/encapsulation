import { SpyPrinter } from './printer/printer.spec';
import { Wallet } from './wallet';

describe('wallet', () => {
  const spy = new SpyPrinter();

  it('is not possible to create wallet with negative money', () => {
    expect(() => {
      new Wallet(-2);
    }).toThrow('You have not enough money is your wallet');
  });

  it('is possible to withdraw the money', () => {
    const wallet = new Wallet(5);

    const withdraw = wallet.withdraw(2);
    wallet.balance(spy);

    expect(spy.data).toStrictEqual('3$');
    expect(withdraw).toStrictEqual(2);
  });

  it('should not be possible to withdraw more money than is in wallet', () => {
    const wallet = new Wallet(5);

    expect(() => {
      wallet.withdraw(6);
    }).toThrow('You have not enough money is your wallet');
  });
});
