import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoStorageService {
  private readonly storageKey = 'selectedCryptos';

  constructor() {}

  // Kriptovaluták lekérése a local storage-ból
  getSelectedCryptos(): string[] {
    const cryptosJson = localStorage.getItem(this.storageKey);
    return cryptosJson ? JSON.parse(cryptosJson) : [];
  }

  // Kriptovaluták mentése a local storage-ba
  saveSelectedCryptos(cryptos: string[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cryptos));
  }
}
