import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignStepperComponent } from './campaign-stepper.component';

describe('CampaignStepperComponent', () => {
  let component: CampaignStepperComponent;
  let fixture: ComponentFixture<CampaignStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
