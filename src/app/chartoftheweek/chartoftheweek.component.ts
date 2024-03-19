import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-chartoftheweek',
  templateUrl: './chartoftheweek.component.html',
  styleUrls: ['./chartoftheweek.component.scss'],
})
export class ChartoftheweekComponent implements OnInit, OnDestroy {
  candlestickData: any[] = [];
  subscription: Subscription | undefined;
  candlestickChart: any; // Store reference to the Chart.js chart instance

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.fetchCandlestickData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchCandlestickData(): void {
    this.subscription = this.portfolioService.getCandlestickData().subscribe({
      next: (data) => {
        this.candlestickData = data;
        this.updateChart();
      },
      error: (error) => {
        console.error('Error fetching candlestick data:', error);
      },
    });
  }

  updateChart(): void {
    if (!this.candlestickData.length) {
      return;
    }

    if (this.candlestickChart) {
      this.candlestickChart.destroy(); // Destroy the existing chart instance if it exists
    }

    const canvas = document.getElementById(
      'candlestickChart'
    ) as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found.');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D rendering context.');
      return;
    }

    this.candlestickChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            data: this.candlestickData,
          },
        ],
      },
      options: {
        // Add Chart.js options as needed
      },
    });
  }
}
