import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { Subscription } from 'rxjs';

interface SelectedCrypto {
  label: string;
  // Add other properties if needed
}

interface Price {
  FROMSYMBOL: string;
  TOSYMBOL: string;
  PRICE: number;
  LASTUPDATE: Date;
  VOLUME24HOUR: number;
  HIGH24HOUR: number;
  LOW24HOUR: number;
}

@Component({
  selector: 'app-portfolio-display',
  templateUrl: './portfolio-display.component.html',
  styleUrls: ['./portfolio-display.component.scss'],
})
export class PortfolioDisplayComponent implements OnInit, OnDestroy {
  @Input() selectedCrypto: SelectedCrypto | undefined;
  prices: any[] = [];
  messages: any[] = [];
  private websocketSubscription!: Subscription;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    console.log('Selected Crypto:', this.selectedCrypto);
    this.prices = [
      {
        FROMSYMBOL: 'BTC',
        TOSYMBOL: 'USD',
        PRICE: 55000,
        LASTUPDATE: new Date(),
        VOLUME24HOUR: 1000,
        HIGH24HOUR: 60000,
        LOW24HOUR: 50000,
      },
      {
        FROMSYMBOL: 'XRP',
        TOSYMBOL: 'USD',
        PRICE: 1.2,
        LASTUPDATE: new Date(),
        VOLUME24HOUR: 2000,
        HIGH24HOUR: 1.5,
        LOW24HOUR: 1.0,
      },
      {
        FROMSYMBOL: 'DOGE',
        TOSYMBOL: 'USD',
        PRICE: 0.5,
        LASTUPDATE: new Date(),
        VOLUME24HOUR: 5000,
        HIGH24HOUR: 0.6,
        LOW24HOUR: 0.4,
      },
      {
        FROMSYMBOL: 'ETH',
        TOSYMBOL: 'USD',
        PRICE: 2000,
        LASTUPDATE: new Date(),
        VOLUME24HOUR: 3000,
        HIGH24HOUR: 2200,
        LOW24HOUR: 1800,
      },
    ];

    this.websocketSubscription = this.portfolioService
      .getPricesByWebsocket()
      .subscribe({
        next: (message: any) => {
          if (
            message.FROMSYMBOL &&
            message.PRICE &&
            message.LASTUPDATE &&
            message.VOLUME24HOUR
          ) {
            const index = this.prices.findIndex(
              (price) => price.FROMSYMBOL === message.FROMSYMBOL
            );
            if (index !== -1) {
              // Frissítsd a high és low értékeket is
              this.prices[index] = {
                ...this.prices[index],
                PRICE: message.PRICE,
                LASTUPDATE: message.LASTUPDATE,
                VOLUME24HOUR: message.VOLUME24HOUR,
                high: message.HIGH24HOUR,
                low: message.LOW24HOUR,
              };
            } else {
              this.prices.push(message);
            }
          }
        },
        error: (error) => {
          console.error('WebSocket error:', error);
          // Kezeld a hibaüzeneteket szükség szerint
        },
      });
  }

  ngOnDestroy(): void {
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
  }
}
