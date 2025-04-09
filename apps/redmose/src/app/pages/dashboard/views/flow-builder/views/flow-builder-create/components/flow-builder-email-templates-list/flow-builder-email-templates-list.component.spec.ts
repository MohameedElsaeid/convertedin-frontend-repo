import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderEmailTemplatesListComponent } from './flow-builder-email-templates-list.component';

describe('FlowBuilderEmailTemplatesListComponent', () => {
  let component: FlowBuilderEmailTemplatesListComponent;
  let fixture: ComponentFixture<FlowBuilderEmailTemplatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowBuilderEmailTemplatesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderEmailTemplatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
