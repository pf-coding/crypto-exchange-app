import { TestBed } from '@angular/core/testing';

import { CryptostorageService } from './cryptostorage.service';

describe('CryptostorageService', () => {
  let service: CryptostorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptostorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
