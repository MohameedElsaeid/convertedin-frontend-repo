import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignAdsComponent } from './campaign-ads.component';

describe('CampaignAdsComponent', () => {
  let component: CampaignAdsComponent;
  let fixture: ComponentFixture<CampaignAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignAdsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
