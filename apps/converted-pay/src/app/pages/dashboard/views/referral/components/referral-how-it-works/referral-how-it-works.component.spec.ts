import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReferralHowItWorksComponent } from './referral-how-it-works.component';

describe('ReferralHowItWorksComponent', () => {
  let component: ReferralHowItWorksComponent;
  let fixture: ComponentFixture<ReferralHowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralHowItWorksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReferralHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
