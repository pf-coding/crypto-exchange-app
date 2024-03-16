// portfolio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, throwError, of, EMPTY } from 'rxjs';
import { catchError, retryWhen, delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'https://rest.coinapi.io/v1/exchangerate';
  private apiKey = '5714233D-4D13-40E3-AA4C-8376E0324561';
  private localData = 'http://localhost:3000/crypto-local';

  constructor(private http: HttpClient) {}

  getExchangeRates(assets: string[]): Observable<any[]> {
    const requests: Observable<any>[] = assets.map((asset) =>
      this.http.get(`${this.apiUrl}/${asset}/USD?apikey=${this.apiKey}`).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 429) {
            console.warn(
              `Rate limit exceeded for ${asset}/USD. Retrying after a delay...`
            );
            return of(null); // Continue with the next request
          } else {
            console.error(
              `Error fetching exchange rate for ${asset}/USD:`,
              error
            );
            return throwError(() => error);
          }
        })
      )
    );

    return forkJoin(requests).pipe(
      switchMap((responses) => {
        // Check if there are null responses (requests that encountered rate limiting)
        const hasRateLimiting = responses.some((response) => response === null);

        if (hasRateLimiting) {
          // If rate limiting occurred, retry after a delay
          console.warn('Rate limit exceeded. Retrying after a delay...');
          return EMPTY.pipe(delay(5000)); // Adjust the delay duration as needed
        } else {
          // If no rate limiting, continue with the responses
          return of(responses);
        }
      }),
      retryWhen((errors) => errors.pipe(delay(1000))) // Additional retry delay, adjust as needed
    );
  }

  saveDataToJSON(data: any): Observable<any> {
    return this.http.post<any>(this.localData, data);
  }
}
