import { Component, NgModule } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.scss'],
})
export class ExchangerComponent {
  objectKeys = Object.keys;
  cryptos: any;
  selectedCoin: string = '';
  coinValue!: number;
  conversionRate: number = 1;
  usdToCryptoAmount: number = 1;
  cryptoToUsdAmount: number = 1;
  showSelectedCoinDetails: boolean = false;

  constructor(private _data: PortfolioService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const selectedCrypto = params['content'].toUpperCase();
      if (selectedCrypto) {
        this.selectedCoin = selectedCrypto;
        this.selectCoin(selectedCrypto);
      }
    });

    this._data.getPrices().subscribe((res) => {
      this.cryptos = res;
      console.table('API cryptocurrency JSON data', this.cryptos);
    });
  }
  selectCoin(coin: string) {
    this.coinValue = this.cryptos[coin].USD;
    this.conversionRate = 1 / this.coinValue;
    this.showSelectedCoinDetails = true; // Show details when coin is selected
  }

  formatCurrency(value: number): string {
    return '$' + value.toFixed(2);
  }

  updateUsdToCryptoAmount(event: number) {
    this.usdToCryptoAmount = Number(event); // Convert event value to number
  }

  updateCryptoToUsdAmount(event: number) {
    this.cryptoToUsdAmount = Number(event); // Convert event value to number
  }

  convertUsdToCrypto() {
    if (this.selectedCoin && this.coinValue) {
      this.cryptoToUsdAmount = this.usdToCryptoAmount / this.coinValue;
    }
  }

  convertCryptoToUsd() {
    if (this.selectedCoin && this.coinValue) {
      this.usdToCryptoAmount = this.cryptoToUsdAmount * this.coinValue;
    }
  }

  toggleSelectedCoinDetails(): void {
    this.showSelectedCoinDetails = !this.showSelectedCoinDetails;
  }
}

@NgModule({
  imports: [BrowserModule, FormsModule], // Import BrowserModule here
  providers: [PortfolioService],
})
export class ExchangerModule {} // Define a module for ExchangerComponent
