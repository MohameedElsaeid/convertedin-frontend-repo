import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectGoalComponent } from './select-goal.component';

describe('SelectGoalComponent', () => {
  let component: SelectGoalComponent;
  let fixture: ComponentFixture<SelectGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectGoalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
