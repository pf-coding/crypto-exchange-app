// portfolio-display.component.ts

import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio-display',
  templateUrl: './portfolio-display.component.html',
  styleUrls: ['./portfolio-display.component.scss'],
})
export class PortfolioDisplayComponent implements OnInit {
  portfolio: any = {};

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  private fetchExchangeRates(): void {
    const assets = ['BTC', 'ETH', 'XRP'];
    this.portfolioService.getExchangeRates(assets).subscribe(
      (responses) => {
        responses.forEach((response, index) => {
          this.portfolio[assets[index]] = response.rate;
        });
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }

  getPortfolioKeys(): string[] {
    return Object.keys(this.portfolio);
  }
}
