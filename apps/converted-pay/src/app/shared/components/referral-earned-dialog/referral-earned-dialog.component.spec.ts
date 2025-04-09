import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReferralEarnedDialogComponent } from './referral-earned-dialog.component';

describe('ReferralEarnedDialogComponent', () => {
  let component: ReferralEarnedDialogComponent;
  let fixture: ComponentFixture<ReferralEarnedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralEarnedDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReferralEarnedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
