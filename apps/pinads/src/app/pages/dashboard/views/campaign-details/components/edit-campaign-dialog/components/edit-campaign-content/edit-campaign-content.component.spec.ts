import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCampaignContentComponent } from './edit-campaign-content.component';

describe('EditCampaignContentComponent', () => {
  let component: EditCampaignContentComponent;
  let fixture: ComponentFixture<EditCampaignContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCampaignContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCampaignContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
