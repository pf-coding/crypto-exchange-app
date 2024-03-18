import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() selectedCrypto: any; // Receive selected cryptocurrency data

  chartData: any[] = []; // Initialize chartData with an empty array
  view: [number, number] = [700, 300];
  legend: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Exchange Rate (USD)';
  timeline: boolean = true;
  animations: boolean = true;
  showLabels: boolean = true;

  colorScheme: Color = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    name: 'ownprops',
    selectable: true,
    group: ScaleType.Ordinal,
  };

  dataSubscription: Subscription | undefined;
  fetchedData: any[] = []; // Array to store fetched data
  loading: boolean = true; // Flag to indicate loading state
  curveType = d3.curveBasis;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch initial data and start fetching updated data every 5 seconds
    this.fetchData();
    this.dataSubscription = timer(0, 5000).subscribe(() => {
      this.fetchData();
    });

    if (this.selectedCrypto && this.selectedCrypto.label) {
      const label = this.selectedCrypto.label.toUpperCase();
      // Now you can use the selected cryptocurrency label to fetch data or filter chartData
      console.log('Selected cryptocurrency label:', label);
    } else {
      console.error('Selected cryptocurrency label is missing.');
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.selectedCrypto && changes.selectedCrypto.currentValue) {
      console.log(
        'Received data in ChartComponent:',
        changes.selectedCrypto.currentValue
      );
      // Update chartData here if needed
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from dataSubscription to prevent memory leaks
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  fetchData(): void {
    // Fetch data from the server or any other source
    this.http
      .get<any>('http://localhost:3000/crypto-local')
      .subscribe((data: any[]) => {
        console.log('Fetched data:', data);
        this.fetchedData = data; // Store fetched data
        this.loading = false; // Set loading flag to false
        this.updateChartData(); // Update the chart data
      });
  }

  updateChartData(): void {
    // Clear previous chart data
    this.chartData = [];

    // Iterate through the fetched data and format it for the chart
    this.fetchedData.forEach((item) => {
      const timestamp = new Date(item.timestamp); // Convert timestamp to Date object
      const data = item.data;

      // Iterate through each cryptocurrency in the data
      Object.keys(data).forEach((cryptoLabel) => {
        // Skip the 'label' property
        if (cryptoLabel !== 'label') {
          const value = data[cryptoLabel];

          // Check if the cryptocurrency label already exists in chartData
          const existingDataPointIndex = this.chartData.findIndex(
            (point) =>
              point.name.getTime() === timestamp.getTime() &&
              point.series[0].name === cryptoLabel
          );

          if (existingDataPointIndex !== -1) {
            // If the cryptocurrency label already exists for the current timestamp, update its value
            this.chartData[existingDataPointIndex].series[0].value = value;
          } else {
            // Otherwise, construct a new data point
            const dataPoint = {
              name: item.id,
              series: [{ name: timestamp, value: value }],
            };
            // Push the data point to the chart data array
            this.chartData.push(dataPoint);
          }
        }
      });
    });

    // Optionally, sort the chart data by timestamp
    this.chartData.sort((a, b) => a.name.getTime() - b.name.getTime());

    console.log('Modified chart data:', this.chartData);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
