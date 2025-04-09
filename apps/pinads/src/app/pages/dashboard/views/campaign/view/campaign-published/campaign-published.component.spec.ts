import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignPublishedComponent } from './campaign-published.component';

describe('CampaignPublishedComponent', () => {
  let component: CampaignPublishedComponent;
  let fixture: ComponentFixture<CampaignPublishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignPublishedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
