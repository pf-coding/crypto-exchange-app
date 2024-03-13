// crypto-display.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptocurrencyService } from '../services/cryptocurrency.service';

@Component({
  selector: 'app-crypto-display',
  templateUrl: './crypto-display.component.html',
  styleUrls: ['./crypto-display.component.scss'],
})
export class CryptoDisplayComponent implements OnInit {
  cryptocurrency: any;

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptocurrencyService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('Route Params:', params);
      const content = params['content'];
      if (content) {
        this.cryptocurrency = {
          label: content.toUpperCase(),
          // Other properties...
        };
      } else {
        console.error("Route parameter 'content' is undefined.");
      }
    });
  }
}
