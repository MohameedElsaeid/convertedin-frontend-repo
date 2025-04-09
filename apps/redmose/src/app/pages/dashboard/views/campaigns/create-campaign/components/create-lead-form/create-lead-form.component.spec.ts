import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLeadFormComponent } from './create-lead-form.component';

describe('CreateLeadFormComponent', () => {
  let component: CreateLeadFormComponent;
  let fixture: ComponentFixture<CreateLeadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLeadFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateLeadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
