import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog for modal functionality
import { CryptoModalComponent } from '../crypto-modal/crypto-modal.component';
import { PortfolioService } from '../services/portfolio.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() cryptocurrency: any; // Assuming cryptocurrency is of type any for simplicity

  @ViewChild('addCryptoModal') addCryptoModal!: TemplateRef<any>;
  tabs = [
    { label: 'Descripton', path: '/description' },
    { label: 'BTC', content: 'Content for BitCoin', path: '/tabs/btc' },
    {
      label: 'ETH',
      content: 'Content for Etherium',
      path: '/tabs/eth',
    },
    {
      label: 'XRP',
      content: 'Content for XRP',
      path: '/tabs/xrp',
    },
    {
      label: 'DOGE',
      content: 'Content for DOGE',
      path: '/tabs/doge',
    },
  ];

  activeTabIndex = 0;
  showModal: boolean = false;
  newCryptoName: string = '';
  loading: boolean = false; // Flag to indicate data loading state

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private portfolioService: PortfolioService,
    private loadingService: LoadingService
  ) {}

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
    const selectedLabel = this.tabs[index].label;
    const selectedValue = this.cryptocurrency[selectedLabel.toLowerCase()];
    const selectedData = {
      id: '8dad',
      timestamp: new Date().toISOString(),
      data: {
        label: selectedLabel.toUpperCase(),
        [selectedLabel.toUpperCase()]: selectedValue,
      },
    };
  }

  getRouterLink(label: string): any[] {
    const index = this.tabs.findIndex(
      (tab) => tab.label.toLowerCase() === label.toLowerCase()
    );

    if (index !== -1) {
      return [this.tabs[index].path];
    }

    return ['/tabs'];
  }

  addNewTab(newCryptoName: string): void {
    if (newCryptoName && newCryptoName.trim() !== '') {
      const newTab = {
        label: newCryptoName,
        content: 'Content for ' + newCryptoName,
        path: `/tabs/${newCryptoName.toLowerCase().replace(' ', '-')}`,
      };
      this.tabs.push(newTab); // Add the new tab to the end of the tabs array
      this.activeTabIndex = this.tabs.length - 1; // Set the newly added tab as active
      this.router.navigateByUrl(newTab.path); // Navigate to the newly added tab's content
      this.fetchDataForNewTab(newTab.label); // Fetch data for the newly added tab
    }
  }

  removeTab(label: string): void {
    const index = this.tabs.findIndex((tab) => tab.label === label);
    if (index !== -1) {
      this.tabs.splice(index, 1); // Remove tab from array
    }
  }

  openModal(): void {
    // Open the modal using MatDialog
    const dialogRef = this.dialog.open(CryptoModalComponent);

    // Subscribe to the afterClosed event to handle modal closure
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle result data from the modal (e.g., add new tab)
        this.addNewTab(result);
      }
    });
  }

  fetchDataForNewTab(label: string): void {
    // Fetch data for the new tab using PortfolioService
    this.portfolioService.getExchangeRates([label.toUpperCase()]).subscribe(
      (response) => {
        // Handle successful response
        console.log('Data fetched successfully:', response);
        this.loadingService.setLoadingState(false); // Set loading state to false when data is fetched
      },
      (error) => {
        // Handle error
        console.error('Error fetching data for new tab:', error);
        this.loadingService.setLoadingState(false); // Set loading state to false in case of error
      }
    );
  }
}
