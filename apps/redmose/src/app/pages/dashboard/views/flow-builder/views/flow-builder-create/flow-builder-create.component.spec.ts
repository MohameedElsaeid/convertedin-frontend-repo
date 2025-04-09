import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderCreateComponent } from './flow-builder-create.component';

describe('FlowBuilderCreateComponent', () => {
  let component: FlowBuilderCreateComponent;
  let fixture: ComponentFixture<FlowBuilderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
