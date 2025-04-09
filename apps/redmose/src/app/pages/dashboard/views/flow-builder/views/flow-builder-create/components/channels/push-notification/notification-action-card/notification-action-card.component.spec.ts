import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderNotificationActionCardComponent } from './notification-action-card.component';

describe('FlowBuilderNotificationActionCardComponent', () => {
  let component: FlowBuilderNotificationActionCardComponent;
  let fixture: ComponentFixture<FlowBuilderNotificationActionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderNotificationActionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      FlowBuilderNotificationActionCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
