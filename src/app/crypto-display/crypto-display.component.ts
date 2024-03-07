// crypto-display.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crypto-display',
  templateUrl: './crypto-display.component.html',
  styleUrls: ['./crypto-display.component.scss'],
})
export class CryptoDisplayComponent implements OnInit {
  cryptocurrency: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const content = params['content'];
      // Fetch data based on content (e.g., using your service)
      this.cryptocurrency = {
        label: content.toUpperCase(), // You can customize this based on your actual data
        // Other properties...
      };
    });
  }
}
