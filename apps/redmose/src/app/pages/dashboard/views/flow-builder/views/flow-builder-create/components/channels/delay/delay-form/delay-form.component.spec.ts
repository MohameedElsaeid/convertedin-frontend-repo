import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderDelayFormComponent } from '../..';

describe('FlowBuilderDelayFormComponent', () => {
  let component: FlowBuilderDelayFormComponent;
  let fixture: ComponentFixture<FlowBuilderDelayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderDelayFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderDelayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
