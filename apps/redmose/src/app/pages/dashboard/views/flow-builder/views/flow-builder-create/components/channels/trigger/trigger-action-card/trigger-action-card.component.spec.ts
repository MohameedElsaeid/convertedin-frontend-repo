import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderTriggerActionCardComponent } from './trigger-action-card.component';

describe('FlowBuilderTriggerActionCardComponent', () => {
  let component: FlowBuilderTriggerActionCardComponent;
  let fixture: ComponentFixture<FlowBuilderTriggerActionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderTriggerActionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderTriggerActionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
