import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartoftheweekComponent } from './chartoftheweek.component';

describe('ChartoftheweekComponent', () => {
  let component: ChartoftheweekComponent;
  let fixture: ComponentFixture<ChartoftheweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartoftheweekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartoftheweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
