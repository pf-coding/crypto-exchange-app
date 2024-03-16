import { TestBed } from '@angular/core/testing';

import { MockPortfolioService } from './mock-portfolio.service';

describe('MockPortfolioService', () => {
  let service: MockPortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockPortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
