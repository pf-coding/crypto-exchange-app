import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'https://min-api.cryptocompare.com/data/pricemulti';
  private localData = 'http://localhost:3000/crypto-local';
  result: any;

  constructor(private http: HttpClient) {}

  getExchangeRates(assets: string[]): Observable<any[]> {
    const fsymsList = assets.join(',');
    return this.http.get<any>(`${this.apiUrl}?fsyms=${fsymsList}&tsyms=USD`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching exchange rates:', error);
        return throwError(() => error);
      })
    );
  }

  saveDataToJSON(data: any): Observable<any> {
    return this.http.post<any>(this.localData, data);
  }

  getPrices() {
    const fsymsList = 'BTC,XRP,DOGE,ETH';
    return this.http
      .get(
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' +
          fsymsList +
          '&tsyms=USD'
      )
      .pipe((result) => (this.result = result));
  }
}
