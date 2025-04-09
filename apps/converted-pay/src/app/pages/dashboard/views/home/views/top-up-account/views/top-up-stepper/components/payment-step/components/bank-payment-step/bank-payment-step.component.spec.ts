import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankPaymentStepComponent } from './bank-payment-step.component';

describe('BankPaymentStepComponent', () => {
  let component: BankPaymentStepComponent;
  let fixture: ComponentFixture<BankPaymentStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankPaymentStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BankPaymentStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
