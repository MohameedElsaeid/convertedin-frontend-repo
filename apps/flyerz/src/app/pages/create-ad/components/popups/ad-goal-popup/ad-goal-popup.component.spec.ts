import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdGoalPopupComponent } from './ad-goal-popup.component';

describe('AdGoalPopupComponent', () => {
  let component: AdGoalPopupComponent;
  let fixture: ComponentFixture<AdGoalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdGoalPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdGoalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
