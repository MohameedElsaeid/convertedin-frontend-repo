import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentUploadReceiptComponent } from './payment-upload-receipt.component';

describe('PaymentUploadReceiptComponent', () => {
  let component: PaymentUploadReceiptComponent;
  let fixture: ComponentFixture<PaymentUploadReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentUploadReceiptComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentUploadReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
