import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderTemplatesComponent } from './flow-builder-templates.component';

describe('FlowBuilderTemplatesComponent', () => {
  let component: FlowBuilderTemplatesComponent;
  let fixture: ComponentFixture<FlowBuilderTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowBuilderTemplatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
