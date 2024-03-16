import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-crypto-display',
  templateUrl: './crypto-display.component.html',
  styleUrls: ['./crypto-display.component.scss'],
})
export class CryptoDisplayComponent implements OnInit, OnDestroy {
  cryptocurrency: any;
  private refreshSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private router: Router
  ) {}

  onTabSelected(content: string): void {
    // Navigate to the selected cryptocurrency route
    this.router.navigate(['/tabs', content]);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('Route Params:', params);
      const content = params['content'];
      if (content) {
        this.cryptocurrency = {
          label: content.toUpperCase(),
        };
        this.fetchExchangeRates(content); // Initial fetch
        // Start periodic refresh every 5 seconds
        this.refreshSubscription = interval(5000).subscribe(() =>
          this.fetchExchangeRates(content)
        );
      } else {
        console.error("Route parameter 'content' is undefined.");
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the refresh subscription to prevent memory leaks
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private fetchExchangeRates(content: string): void {
    const assets = [content.toUpperCase()];
    this.portfolioService.getExchangeRates(assets).subscribe(
      (responses) => {
        responses.forEach((response, index) => {
          this.cryptocurrency[assets[index]] = response.rate;
        });
        this.saveData(); // Save updated data after each fetch
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }

  getPortfolioKeys(): string[] {
    return Object.keys(this.cryptocurrency);
  }

  saveData(): void {
    const dataWithTimestamp = {
      timestamp: new Date().toISOString(),
      data: this.cryptocurrency,
    };
    // Call the service to save data to JSON
    this.portfolioService.saveDataToJSON(dataWithTimestamp).subscribe(
      (response) => {
        console.log('Data saved successfully:', response);
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );
  }
}
