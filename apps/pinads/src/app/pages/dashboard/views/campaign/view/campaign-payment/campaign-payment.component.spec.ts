import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignPaymentComponent } from './campaign-payment.component';

describe('CampaignPaymentComponent', () => {
  let component: CampaignPaymentComponent;
  let fixture: ComponentFixture<CampaignPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignPaymentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
