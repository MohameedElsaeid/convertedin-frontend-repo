import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCampaignLocationComponent } from './edit-campaign-location.component';

describe('EditCampaignLocationComponent', () => {
  let component: EditCampaignLocationComponent;
  let fixture: ComponentFixture<EditCampaignLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCampaignLocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCampaignLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
