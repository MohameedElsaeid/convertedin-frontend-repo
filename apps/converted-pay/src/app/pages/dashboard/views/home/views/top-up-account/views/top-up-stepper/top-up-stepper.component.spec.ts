import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopUpStepperComponent } from './top-up-stepper.component';

describe('TopUpStepperComponent', () => {
  let component: TopUpStepperComponent;
  let fixture: ComponentFixture<TopUpStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopUpStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopUpStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
