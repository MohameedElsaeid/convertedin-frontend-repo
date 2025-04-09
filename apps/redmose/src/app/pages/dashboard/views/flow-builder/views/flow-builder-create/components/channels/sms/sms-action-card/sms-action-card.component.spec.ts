import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderSmsActionCardComponent } from './sms-action-card.component';

describe('FlowBuilderSmsActionCardComponent', () => {
  let component: FlowBuilderSmsActionCardComponent;
  let fixture: ComponentFixture<FlowBuilderSmsActionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderSmsActionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderSmsActionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
