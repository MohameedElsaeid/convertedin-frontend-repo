import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignPlatformsComponent } from './campaign-platforms.component';

describe('CampaignPlatformsComponent', () => {
  let component: CampaignPlatformsComponent;
  let fixture: ComponentFixture<CampaignPlatformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignPlatformsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignPlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
