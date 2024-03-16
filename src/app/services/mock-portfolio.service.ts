import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockPortfolioService {
  // Define a mock response object containing exchange rates
  mockExchangeRates: { [key: string]: number } = {
    BTC: 45000, // Example rates
    ETH: 3000,
    XRP: 1.2,
  };

  constructor() {}

  // Simulate the getExchangeRates method
  getExchangeRates(assets: string[]): Observable<any> {
    const responses = assets.map((asset) => ({
      asset,
      rate: this.mockExchangeRates[asset],
    }));
    return of(responses); // Return an observable of the mock responses
  }
}
