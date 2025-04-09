import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdCampaignComponent } from './ad-campaign.component';

describe('AdCampaignComponent', () => {
  let component: AdCampaignComponent;
  let fixture: ComponentFixture<AdCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdCampaignComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
