import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderSmsFormComponent } from './sms-form.component';

describe('FlowBuilderSmsFormComponent', () => {
  let component: FlowBuilderSmsFormComponent;
  let fixture: ComponentFixture<FlowBuilderSmsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderSmsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderSmsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
