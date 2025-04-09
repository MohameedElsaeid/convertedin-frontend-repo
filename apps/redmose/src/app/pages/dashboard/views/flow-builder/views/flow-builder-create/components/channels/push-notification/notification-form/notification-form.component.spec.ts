import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderNotificationFormComponent } from './notification-form.component';

describe('FlowBuilderNotificationFormComponent', () => {
  let component: FlowBuilderNotificationFormComponent;
  let fixture: ComponentFixture<FlowBuilderNotificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderNotificationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderNotificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
