import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VodafonPaymentStepComponent } from './vodafon-payment-step.component';

describe('VodafonPaymentStepComponent', () => {
  let component: VodafonPaymentStepComponent;
  let fixture: ComponentFixture<VodafonPaymentStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VodafonPaymentStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VodafonPaymentStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
