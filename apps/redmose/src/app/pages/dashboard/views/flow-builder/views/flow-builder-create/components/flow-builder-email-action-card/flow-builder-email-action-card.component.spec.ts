import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderEmailActionCardComponent } from './flow-builder-email-action-card.component';

describe('FlowBuilderEmailActionCardComponent', () => {
  let component: FlowBuilderEmailActionCardComponent;
  let fixture: ComponentFixture<FlowBuilderEmailActionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderEmailActionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderEmailActionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
