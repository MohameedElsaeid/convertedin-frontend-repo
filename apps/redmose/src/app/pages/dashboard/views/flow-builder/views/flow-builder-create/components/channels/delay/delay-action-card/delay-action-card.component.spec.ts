import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderDelayActionCardComponent } from './delay-action-card.component';

describe('FlowBuilderDelayActionCardComponent', () => {
  let component: FlowBuilderDelayActionCardComponent;
  let fixture: ComponentFixture<FlowBuilderDelayActionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderDelayActionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderDelayActionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
