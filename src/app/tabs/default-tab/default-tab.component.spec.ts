import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTabComponent } from './default-tab.component';

describe('DefaultTabComponent', () => {
  let component: DefaultTabComponent;
  let fixture: ComponentFixture<DefaultTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
