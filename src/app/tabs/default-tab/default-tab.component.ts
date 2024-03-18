import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-default-tab',
  templateUrl: './default-tab.component.html',
  styleUrls: ['./default-tab.component.scss'],
})
export class DefaultTabComponent {
  constructor(
    private _data: PortfolioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  objectKeys = Object.keys;
  cryptos: any;
  selectedCoin: string = '';
  coinValue!: number;
  conversionRate: number = 1;
  usdToCryptoAmount: number = 1;
  cryptoToUsdAmount: number = 1;
  showSelectedCoinDetails: boolean = false;

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

    // Navigate to the corresponding tab
    this.router.navigate(['/tabs', coin.toLowerCase()]);
  }

  formatCurrency(value: number): string {
    return '$' + value.toFixed(2);
  }
}
