import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetBreakdownComponent } from './budget-breakdown.component';

describe('BudgetBreakdownComponent', () => {
  let component: BudgetBreakdownComponent;
  let fixture: ComponentFixture<BudgetBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetBreakdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
