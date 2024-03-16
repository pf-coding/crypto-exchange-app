import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crypto-modal',
  templateUrl: './crypto-modal.component.html',
  styleUrls: ['./crypto-modal.component.scss']
})
export class CryptoModalComponent {
  newCryptoName: string = '';

  constructor(public dialogRef: MatDialogRef<CryptoModalComponent>) {}

  addNewCrypto(): void {
    // You can perform any necessary validation here before closing the modal
    if (this.newCryptoName.trim() !== '') {
      this.dialogRef.close(this.newCryptoName);
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
