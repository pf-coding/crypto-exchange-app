import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog for modal functionality
import { CryptoModalComponent } from '../crypto-modal/crypto-modal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() cryptocurrency: any; // Assuming cryptocurrency is of type any for simplicity

  @ViewChild('addCryptoModal') addCryptoModal!: TemplateRef<any>;
  tabs = [
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

  constructor(private router: Router, private dialog: MatDialog) {}

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
    const newTabLabel = prompt('Enter new cryptocurrency name:');
    if (newTabLabel && newTabLabel.trim() !== '') {
      const newTab = {
        label: newTabLabel,
        content: 'Content for ' + newTabLabel,
        path: `/tabs/${newTabLabel.toLowerCase().replace(' ', '-')}`,
      };
      this.tabs.push(newTab); // Add the new tab to the end of the tabs array
      this.activeTabIndex = this.tabs.length - 1; // Set the newly added tab as active
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
}
