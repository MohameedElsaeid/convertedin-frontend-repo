import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlankCampaignAdCreativeComponent } from './blank-campaign-ad-creative.component';

describe('BlankCampaignAdCreativeComponent', () => {
  let component: BlankCampaignAdCreativeComponent;
  let fixture: ComponentFixture<BlankCampaignAdCreativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankCampaignAdCreativeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlankCampaignAdCreativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
