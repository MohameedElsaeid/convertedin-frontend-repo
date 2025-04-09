import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignConfigurationInfoComponent } from './campaign-configuration-info.component';

describe('CampaignConfigurationInfoComponent', () => {
  let component: CampaignConfigurationInfoComponent;
  let fixture: ComponentFixture<CampaignConfigurationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignConfigurationInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignConfigurationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
