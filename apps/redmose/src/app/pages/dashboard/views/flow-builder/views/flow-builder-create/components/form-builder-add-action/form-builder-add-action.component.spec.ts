import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilderAddActionComponent } from './form-builder-add-action.component';

describe('FormBuilderAddActionComponent', () => {
  let component: FormBuilderAddActionComponent;
  let fixture: ComponentFixture<FormBuilderAddActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBuilderAddActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormBuilderAddActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
