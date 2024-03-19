import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog for modal functionality
import { CryptoModalComponent } from '../crypto-modal/crypto-modal.component';
import { PortfolioService } from '../services/portfolio.service';
import { LoadingService } from '../services/loading.service';
import { CryptoStorageService } from '../services/cryptostorage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() cryptocurrency: any; // Assuming cryptocurrency is of type any for simplicity

  @ViewChild('addCryptoModal') addCryptoModal!: TemplateRef<any>;
  tabs = [{ label: 'Descripton', path: '/description' }];
  selectedCryptos: string[] = [];
  activeTabIndex = 0;
  showModal: boolean = false;
  newCryptoName: string = '';
  loading: boolean = false; // Flag to indicate data loading state

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private portfolioService: PortfolioService,
    private loadingService: LoadingService,
    private cryptoStorageService: CryptoStorageService
  ) {}

  ngOnInit(): void {
    // Betöltjük a kriptovalutákat a local storage-ból az inicializáláskor
    this.selectedCryptos = this.cryptoStorageService.getSelectedCryptos();
  }

  selectCrypto(crypto: string): void {
    // Hozzáadjuk a kiválasztott kriptovalutát
    this.selectedCryptos.push(crypto);
    // Mentjük a kriptovalutákat a local storage-ba
    this.cryptoStorageService.saveSelectedCryptos(this.selectedCryptos);
  }

  // Kriptovaluta eltávolítása és mentése
  removeCrypto(crypto: string): void {
    // Eltávolítjuk a kiválasztott kriptovalutát
    this.selectedCryptos = this.selectedCryptos.filter((c) => c !== crypto);
    // Mentjük a kriptovalutákat a local storage-ba
    this.cryptoStorageService.saveSelectedCryptos(this.selectedCryptos);
  }

  setActiveTab(index: number): void {
    if (!this.tabs || index < 0 || index >= this.tabs.length) {
      console.error(
        'Error: Tabs array is not properly initialized or index is out of bounds.'
      );
      return;
    }

    this.activeTabIndex = index;
    const selectedTab = this.tabs[index];
    if (!selectedTab || !selectedTab.label) {
      console.error('Error: Selected tab or label is undefined.');
      return;
    }

    const selectedLabel = selectedTab.label;
    const selectedValue = this.cryptocurrency?.[selectedLabel.toLowerCase()]; // Using optional chaining to handle potential undefined
    if (selectedValue === undefined) {
      console.error(
        `Error: Cryptocurrency value for ${selectedLabel} is undefined.`
      );
      return;
    }

    // Creating selectedData object, even if it's not used, to avoid TypeScript error
    const selectedData = {
      id: '8dad',
      timestamp: new Date().toISOString(),
      data: {
        label: selectedLabel.toUpperCase(),
        [selectedLabel.toUpperCase()]: selectedValue,
      },
    };

    // Check if the tab already exists
    const existingTab = this.tabs.find(
      (tab) => tab.label.toLowerCase() === selectedLabel.toLowerCase()
    );
    if (!existingTab) {
      // If tab doesn't exist, add it dynamically
      const newTab = {
        label: selectedLabel,
        content: `Content for ${selectedLabel}`,
        path: `/tabs/${selectedLabel.toLowerCase()}`,
      };
      this.tabs.push(newTab); // Add the new tab
      this.activeTabIndex = this.tabs.length - 1; // Set the newly added tab as active
    }
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
