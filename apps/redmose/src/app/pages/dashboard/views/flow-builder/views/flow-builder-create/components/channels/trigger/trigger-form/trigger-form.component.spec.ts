import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderTriggerFormComponent } from './trigger-form.component';

describe('FlowBuilderTriggerFormComponent', () => {
  let component: FlowBuilderTriggerFormComponent;
  let fixture: ComponentFixture<FlowBuilderTriggerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderTriggerFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderTriggerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
