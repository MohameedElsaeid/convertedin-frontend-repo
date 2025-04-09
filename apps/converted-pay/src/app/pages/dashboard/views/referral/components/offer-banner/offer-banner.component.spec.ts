import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfferBannerComponent } from './offer-banner.component';

describe('OfferBannerComponent', () => {
  let component: OfferBannerComponent;
  let fixture: ComponentFixture<OfferBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
