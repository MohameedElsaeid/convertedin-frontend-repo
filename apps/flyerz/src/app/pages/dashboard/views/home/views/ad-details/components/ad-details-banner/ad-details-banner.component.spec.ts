import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdDetailsBannerComponent } from './ad-details-banner.component';

describe('AdDetailsBannerComponent', () => {
  let component: AdDetailsBannerComponent;
  let fixture: ComponentFixture<AdDetailsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdDetailsBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdDetailsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
