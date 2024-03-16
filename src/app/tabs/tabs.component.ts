import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() cryptocurrency: any; // Assuming cryptocurrency is of type any for simplicity

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
}
