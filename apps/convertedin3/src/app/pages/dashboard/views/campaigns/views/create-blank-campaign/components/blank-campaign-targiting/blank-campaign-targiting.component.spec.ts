import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlankCampaignTargitingComponent } from './blank-campaign-targiting.component';

describe('BlankCampaignTargitingComponent', () => {
  let component: BlankCampaignTargitingComponent;
  let fixture: ComponentFixture<BlankCampaignTargitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankCampaignTargitingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlankCampaignTargitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
