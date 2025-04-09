import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderPickerComponent } from './flow-builder-picker.component';

describe('FlowBuilderPickerComponent', () => {
  let component: FlowBuilderPickerComponent;
  let fixture: ComponentFixture<FlowBuilderPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
