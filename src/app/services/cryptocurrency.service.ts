// cryptocurrency.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CryptocurrencyService {
  private cryptocurrencies: any[] = [];
  private apiUrl = 'https://rest.coinapi.io/v1';
  private apiKey = '5714233D-4D13-40E3-AA4C-8376E0324561'; // Replace with your actual CoinAPI key

  constructor(private http: HttpClient) {}

  getExchangeRate(symbol: string, vsCurrency: string): Observable<any> {
    const url = `${this.apiUrl}/exchangerate/${symbol}_${vsCurrency}`;
    const headers = new HttpHeaders({
      'X-CoinAPI-Key': this.apiKey,
    });

    return this.http.get(url, { headers }).pipe(
      tap((data) => console.log('Exchange Rate Data:', data)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError(error);
  }

  // Additional methods for handling other functionalities can be added as needed

  getCryptocurrencies(): any[] {
    return this.cryptocurrencies;
  }

  addCrypto(crypto: any): void {
    this.cryptocurrencies.push(crypto);
  }

  getCryptocurrencyDetails(symbol: string): Observable<any> {
    // You can customize this based on your API and data structure
    const vsCurrency = 'USD'; // You might want to customize this based on user preferences or application settings

    return this.getExchangeRate(symbol, vsCurrency);
  }
}

// Additional operations (delete, update, etc.) can be added as needed
