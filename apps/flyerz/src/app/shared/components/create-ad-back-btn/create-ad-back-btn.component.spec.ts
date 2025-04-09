import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAdBackBtnComponent } from './create-ad-back-btn.component';

describe('CreateAdBackBtnComponent', () => {
  let component: CreateAdBackBtnComponent;
  let fixture: ComponentFixture<CreateAdBackBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdBackBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAdBackBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
