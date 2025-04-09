import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordConfirmPasswordComponent } from './password-confirm-password.component';

describe('PasswordConfirmPasswordComponent', () => {
  let component: PasswordConfirmPasswordComponent;
  let fixture: ComponentFixture<PasswordConfirmPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordConfirmPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordConfirmPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
