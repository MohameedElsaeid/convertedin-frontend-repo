import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignObjectiveComponent } from './campaign-objective.component';

describe('CampaignObejctiveComponent', () => {
  let component: CampaignObjectiveComponent;
  let fixture: ComponentFixture<CampaignObjectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignObjectiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
