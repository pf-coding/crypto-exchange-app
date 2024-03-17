import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { PortfolioService } from '../services/portfolio.service';
import { LoadingService } from '../services/loading.service';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-crypto-display',
  templateUrl: './crypto-display.component.html',
  styleUrls: ['./crypto-display.component.scss'],
})
export class CryptoDisplayComponent implements OnInit, OnDestroy {
  cryptocurrency: any;
  private refreshSubscription: Subscription | undefined;
  dataSaved: boolean = false; // Flag to indicate whether data is saved successfully
  loading: boolean = false;
  @ViewChild(TabsComponent) tabsComponent!: TabsComponent;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private router: Router,
    private loadingService: LoadingService
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
        this.cryptocurrency = 'Description';
      }
    });

    this.loadingService.loading$.subscribe((loading) => {
      this.loading = loading; // Update the loading state
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
        this.dataSaved = true; // Set flag to indicate data is saved successfully
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );
  }

  deleteTab(): void {
    const label = this.cryptocurrency.label;

    // Check if the label matches the "Description" tab
    if (label === 'Description') {
      // Navigate to the "Description" tab
      this.router.navigateByUrl('/tabs/description');
    } else {
      // Remove the current tab
      this.tabsComponent.removeTab(label); // Assuming tabsComponent is a reference to your TabsComponent
    }
  }
}
