import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignDetailsOptimizationLogComponent } from './campaign-details-optimization-log.component';

describe('CampaignDetailsOptimizationLogComponent', () => {
  let component: CampaignDetailsOptimizationLogComponent;
  let fixture: ComponentFixture<CampaignDetailsOptimizationLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignDetailsOptimizationLogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignDetailsOptimizationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
