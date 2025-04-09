import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlankCampaignDetailsComponent } from './blank-campaign-details.component';

describe('BlankCampaignDetailsComponent', () => {
  let component: BlankCampaignDetailsComponent;
  let fixture: ComponentFixture<BlankCampaignDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankCampaignDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlankCampaignDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
