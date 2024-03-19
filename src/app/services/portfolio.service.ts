import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'https://min-api.cryptocompare.com/data/pricemulti';
  private localData = 'http://localhost:3000/crypto-local';
  private ws!: WebSocketSubject<any>;
  private apiKey =
    '0dd4bf1d0319a843dd0820d15c7b62ddd6655d28a4ed5b74dc12ddc22780a29c';
  result: any;

  constructor(private http: HttpClient) {}

  getExchangeRates(assets: string[]): Observable<any[]> {
    const fsymsList = assets.join(',');
    return this.http
      .get<any>(`${this.apiUrl}?fsyms=${fsymsList}&tsyms=USD`)
      .pipe(
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

  getPricesByWebsocket(): Observable<any[]> {
    const fsymsList = 'BTC,XRP,DOGE,ETH';
    this.ws = new WebSocketSubject<any>('wss://streamer.cryptocompare.com/v2');
    this.ws.next({
      action: 'SubAdd',
      subs: [
        '5~CCCAGG~BTC~USD',
        '5~CCCAGG~XRP~USD',
        '5~CCCAGG~DOGE~USD',
        '5~CCCAGG~ETH~USD',
      ],
    });
    return this.ws.pipe(
      map((message: any) => {
        if (message.TYPE === '5') {
          return {
            FROMSYMBOL: message.FROMSYMBOL,
            TOSYMBOL: message.TOSYMBOL,
            PRICE: message.PRICE,
            LASTUPDATE: message.LASTUPDATE,
            VOLUME24HOUR: message.VOLUME24HOUR,
            high: message.HIGH24HOUR,
            low: message.LOW24HOUR,
          };
        }
        return null;
      }),
      filter((message: any) => message !== null)
    );
  }
}
