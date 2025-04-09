import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignDetailsOverviewComponent } from './campaign-details-overview.component';

describe('CampaignDetailsOverviewComponent', () => {
  let component: CampaignDetailsOverviewComponent;
  let fixture: ComponentFixture<CampaignDetailsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignDetailsOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
