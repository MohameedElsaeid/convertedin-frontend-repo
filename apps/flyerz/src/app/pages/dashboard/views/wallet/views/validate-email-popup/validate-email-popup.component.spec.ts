import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidateEmailPopupComponent } from './validate-email-popup.component';

describe('ValidateEmailPopupComponent', () => {
  let component: ValidateEmailPopupComponent;
  let fixture: ComponentFixture<ValidateEmailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateEmailPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidateEmailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
