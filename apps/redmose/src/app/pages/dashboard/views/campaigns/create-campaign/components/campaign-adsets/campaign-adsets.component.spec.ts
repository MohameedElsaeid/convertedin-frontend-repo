import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignAdsetsComponent } from './campaign-adsets.component';

describe('CampaignAdsetsComponent', () => {
  let component: CampaignAdsetsComponent;
  let fixture: ComponentFixture<CampaignAdsetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignAdsetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignAdsetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
