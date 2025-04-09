import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderHeaderComponent } from './flow-builder-header.component';

describe('FlowBuilderHeaderComponent', () => {
  let component: FlowBuilderHeaderComponent;
  let fixture: ComponentFixture<FlowBuilderHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowBuilderHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
