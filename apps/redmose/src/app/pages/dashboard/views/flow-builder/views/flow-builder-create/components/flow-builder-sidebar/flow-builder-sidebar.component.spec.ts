import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderSidebarComponent } from './flow-builder-sidebar.component';

describe('FlowBuilderSidebarComponent', () => {
  let component: FlowBuilderSidebarComponent;
  let fixture: ComponentFixture<FlowBuilderSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
