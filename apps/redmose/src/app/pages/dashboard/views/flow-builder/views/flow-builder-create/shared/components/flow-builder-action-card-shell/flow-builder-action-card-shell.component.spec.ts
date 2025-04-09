import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderActionCardShellComponent } from './flow-builder-action-card-shell.component';

describe('FlowBuilderActionCardShellComponent', () => {
  let component: FlowBuilderActionCardShellComponent;
  let fixture: ComponentFixture<FlowBuilderActionCardShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderActionCardShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderActionCardShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
