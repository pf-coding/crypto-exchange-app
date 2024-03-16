import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
    // Fetch data from crypto-local.json
    this.http
      .get<any>('http://localhost:3000/crypto-local')
      .subscribe((data: any[]) => {
        console.log('Fetched data:', data); // Log the fetched data
        this.fetchedData = data; // Store fetched data in the local array
        this.updateChartData(); // Update the chart data
      });
  }

  updateChartData(): void {
    // Clear previous chart data
    this.chartData = [];

    // Modify the format of each data item and update the chart data
    this.fetchedData.forEach((item: any) => {
      const label = item.data.label;
      const timestamp = item.timestamp;
      const value = item.data[label];

      // Construct the modified data item
      const modifiedItem = {
        name: label, // The name of the series (e.g., cryptocurrency label)
        series: [
          {
            name: new Date(timestamp), // The x value (timestamp converted to Date object)
            value: value, // The y value (e.g., exchange rate)
          },
          // You can include more data points in the series array if needed
        ],
      };

      // Push the modified data item to the chart data array
      this.chartData.push(modifiedItem);
    });

    // Sort chartData based on timestamp
    this.chartData.sort(
      (a, b) =>
        new Date(a.series[0].name).getTime() -
        new Date(b.series[0].name).getTime()
    );

    // Filter chartData based on the selected cryptocurrency label
    if (this.selectedCrypto && this.selectedCrypto.label) {
      const selectedLabel = this.selectedCrypto.label.toUpperCase();
      this.chartData = this.chartData.filter(
        (data) => data.name === selectedLabel
      );
    }

    console.log('Modified and filtered chart data:', this.chartData);
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
