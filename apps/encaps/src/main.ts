import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ConsoleLogPrinter } from './app/workshops/printer/console-log-printer';
import { Wallet } from './app/workshops/wallet';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

  const printer = new ConsoleLogPrinter();
  const wallet = new Wallet(5);
  wallet.withdraw(2);
  wallet.balance(printer);
