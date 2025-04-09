import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdRejectReasonPopupComponent } from './ad-reject-reason-popup.component';

describe('AdRejectReasonPopupComponent', () => {
  let component: AdRejectReasonPopupComponent;
  let fixture: ComponentFixture<AdRejectReasonPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdRejectReasonPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdRejectReasonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
