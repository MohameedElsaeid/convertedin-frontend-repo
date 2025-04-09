import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderEmailFlowComponent } from './flow-builder-email-flow.component';

describe('FlowBuilderEmailFlowComponent', () => {
  let component: FlowBuilderEmailFlowComponent;
  let fixture: ComponentFixture<FlowBuilderEmailFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowBuilderEmailFlowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderEmailFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
