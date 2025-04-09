import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudioPaymentComponent } from './studio-payment.component';

describe('StudioPaymentComponent', () => {
  let component: StudioPaymentComponent;
  let fixture: ComponentFixture<StudioPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioPaymentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudioPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
