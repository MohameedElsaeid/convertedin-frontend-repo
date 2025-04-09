import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderWorkflowComponent } from './flow-builder-workflow.component';

describe('FlowBuilderWorkflowComponent', () => {
  let component: FlowBuilderWorkflowComponent;
  let fixture: ComponentFixture<FlowBuilderWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderWorkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
