import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoModalComponent } from './crypto-modal.component';

describe('CryptoModalComponent', () => {
  let component: CryptoModalComponent;
  let fixture: ComponentFixture<CryptoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
