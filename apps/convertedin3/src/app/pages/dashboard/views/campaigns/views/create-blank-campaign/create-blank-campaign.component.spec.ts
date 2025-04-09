import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBlankCampaignComponent } from './create-blank-campaign.component';

describe('CreateBlankCampaignComponent', () => {
  let component: CreateBlankCampaignComponent;
  let fixture: ComponentFixture<CreateBlankCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBlankCampaignComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBlankCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
