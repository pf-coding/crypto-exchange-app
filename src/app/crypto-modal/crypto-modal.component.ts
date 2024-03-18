// crypto-modal.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crypto-modal',
  templateUrl: './crypto-modal.component.html',
  styleUrls: ['./crypto-modal.component.scss'],
})
export class CryptoModalComponent {
  cryptocurrencies: string[] = [
    'BTC',
    'XRP',
    'DOGE',
    'ETH',
  ];
  selectedCrypto: string = '';

  constructor(public dialogRef: MatDialogRef<CryptoModalComponent>) {}

  addNewCrypto(): void {
    if (this.selectedCrypto.trim() !== '') {
      this.dialogRef.close(this.selectedCrypto);
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
