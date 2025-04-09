import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FawryPaymentStepComponent } from './fawry-payment-step.component';

describe('FawryPaymentStepComponent', () => {
  let component: FawryPaymentStepComponent;
  let fixture: ComponentFixture<FawryPaymentStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FawryPaymentStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FawryPaymentStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
