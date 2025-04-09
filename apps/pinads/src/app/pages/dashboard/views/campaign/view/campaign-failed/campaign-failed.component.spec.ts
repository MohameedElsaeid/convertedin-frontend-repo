import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignFailedComponent } from './campaign-failed.component';

describe('CampaignFailedComponent', () => {
  let component: CampaignFailedComponent;
  let fixture: ComponentFixture<CampaignFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignFailedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
