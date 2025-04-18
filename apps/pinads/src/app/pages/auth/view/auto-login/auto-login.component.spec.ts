import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoLoginComponent } from './auto-login.component';

describe('AutoLoginComponent', () => {
  let component: AutoLoginComponent;
  let fixture: ComponentFixture<AutoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
