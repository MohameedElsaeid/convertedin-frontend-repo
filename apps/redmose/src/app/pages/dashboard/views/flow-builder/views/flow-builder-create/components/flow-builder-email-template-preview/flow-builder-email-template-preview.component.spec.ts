import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderEmailTemplatePreviewComponent } from './flow-builder-email-template-preview.component';

describe('FlowBuilderEmailTemplatePreviewComponent', () => {
  let component: FlowBuilderEmailTemplatePreviewComponent;
  let fixture: ComponentFixture<FlowBuilderEmailTemplatePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowBuilderEmailTemplatePreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderEmailTemplatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
