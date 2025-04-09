import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeriodBudgetPopupComponent } from './period-budget-popup.component';

describe('PeriodBudgetPopupComponent', () => {
  let component: PeriodBudgetPopupComponent;
  let fixture: ComponentFixture<PeriodBudgetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodBudgetPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeriodBudgetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
