import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectAdAccountStepComponent } from './select-ad-account-step.component';

describe('SelectAdAccountStepComponent', () => {
  let component: SelectAdAccountStepComponent;
  let fixture: ComponentFixture<SelectAdAccountStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAdAccountStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAdAccountStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
