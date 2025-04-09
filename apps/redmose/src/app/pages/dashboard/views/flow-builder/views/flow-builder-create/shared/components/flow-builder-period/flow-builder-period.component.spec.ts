import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderPeriodComponent } from './flow-builder-period.component';

describe('FlowBuilderPeriodComponent', () => {
  let component: FlowBuilderPeriodComponent;
  let fixture: ComponentFixture<FlowBuilderPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderPeriodComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
