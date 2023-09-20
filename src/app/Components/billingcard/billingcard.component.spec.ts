import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingcardComponent } from './billingcard.component';

describe('BillingcardComponent', () => {
  let component: BillingcardComponent;
  let fixture: ComponentFixture<BillingcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingcardComponent]
    });
    fixture = TestBed.createComponent(BillingcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
