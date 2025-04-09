import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeAmountStepComponent } from './change-amount-step.component';

describe('ChangeAmountStepComponent', () => {
  let component: ChangeAmountStepComponent;
  let fixture: ComponentFixture<ChangeAmountStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeAmountStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeAmountStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
