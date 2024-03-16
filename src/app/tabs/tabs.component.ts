import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog for modal functionality

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() cryptocurrency: any; // Assuming cryptocurrency is of type any for simplicity

  @ViewChild('addCryptoModal') addCryptoModal!: TemplateRef<any>;
  tabs = [
    { label: 'BitCoin', content: 'Content for BitCoin', path: '/tabs/bitcoin' },
    {
      label: 'Etherium',
      content: 'Content for Etherium',
      path: '/tabs/eth',
    },
    {
      label: 'XRP',
      content: 'Content for XRP',
      path: '/tabs/xrp',
    },
    {
      label: 'Portfolio-display',
      content: 'Content for Portfolio display',
      path: '/portfolio-display',
    },
    { label: '+', content: 'Content for Add Tab', path: '/tabs/add' },
  ];

  activeTabIndex = 0;
  showModal: boolean = false; // Flag to control modal visibility
  newCryptoName: string = ''; // Variable to store new cryptocurrency name

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
    const selectedLabel = this.tabs[index].label;
    const selectedValue = this.cryptocurrency[selectedLabel.toLowerCase()]; // Assuming the cryptocurrency object keys are lowercase
    const selectedData = {
      id: '8dad', // Example ID
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
      return [this.tabs[index].path]; // Assuming each tab has a 'path' property
    }

    return ['/tabs']; // Default to the first tab if label is not found
  }

  openModal() {
    this.dialog.open(this.addCryptoModal);
  }

  // Method to close modal
  closeModal() {
    this.dialog.closeAll();
    this.newCryptoName = ''; // Reset new cryptocurrency name
  }

  // Method to add new tab
  addNewTab() {
    const newTab = {
      label: this.newCryptoName,
      content: 'Content for ' + this.newCryptoName,
      path: `/tabs/${this.newCryptoName.toLowerCase().replace(' ', '-')}`,
    };
    this.tabs.push(newTab);
    this.setActiveTab(this.tabs.length - 1); // Set newly added tab as active
    // You may need to navigate to the new tab here depending on your routing setup
    this.newCryptoName = ''; // Clear the input field
  }
}
